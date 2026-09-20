"""Render the research Markdown as a dependency-free, standalone HTML document."""
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parent
source = ROOT / 'portfolio-research-and-blueprint.md'
target = source.with_suffix('.html')
text = source.read_text()

def inline(value):
    tokens = []
    def reserve(match):
        tokens.append('<code>' + html.escape(match.group(1)) + '</code>')
        return f'@@CODE{len(tokens)-1}@@'
    value = re.sub(r'`([^`]+)`', reserve, value)
    value = html.escape(value)
    value = re.sub(r'\[([^\]]+)\]\((https?://[^\s)]+)\)', r'<a href="\2">\1</a>', value)
    value = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', value)
    value = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', value)
    for i, token in enumerate(tokens):
        value = value.replace(f'@@CODE{i}@@', token)
    return value

lines = text.splitlines()
out, toc = [], []
i = 0
while i < len(lines):
    line = lines[i]
    if not line.strip():
        i += 1
        continue
    if line.startswith('```'):
        code = []
        i += 1
        while i < len(lines) and not lines[i].startswith('```'):
            code.append(lines[i])
            i += 1
        out.append('<pre><code>' + html.escape('\n'.join(code)) + '</code></pre>')
        i += 1
        continue
    heading = re.match(r'^(#{1,3}) (.+)', line)
    if heading:
        level, title = len(heading[1]), heading[2]
        slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
        out.append(f'<h{level} id="{slug}">{inline(title)}</h{level}>')
        if level == 2:
            toc.append((slug, title))
        i += 1
        continue
    if line.startswith('|'):
        rows = []
        while i < len(lines) and lines[i].startswith('|'):
            row = [cell.strip() for cell in lines[i].strip().strip('|').split('|')]
            if not all(re.fullmatch(r':?-+:?', cell) for cell in row):
                rows.append(row)
            i += 1
        table = '<div class="table-scroll" tabindex="0" role="region" aria-label="Specification table"><table><thead><tr>'
        table += ''.join('<th scope="col">' + inline(cell) + '</th>' for cell in rows[0])
        table += '</tr></thead><tbody>'
        for row in rows[1:]:
            table += '<tr>' + ''.join('<td>' + inline(cell) + '</td>' for cell in row) + '</tr>'
        out.append(table + '</tbody></table></div>')
        continue
    match = re.match(r'^(?:- |\d+\. )(.+)', line)
    if match:
        ordered = bool(re.match(r'^\d+\.', line))
        tag = 'ol' if ordered else 'ul'
        items = []
        pattern = r'^\d+\. (.+)' if ordered else r'^- (.+)'
        while i < len(lines):
            match = re.match(pattern, lines[i])
            if not match:
                break
            content = match[1]
            if content.startswith('[ ] '):
                content = '☐ ' + content[4:]
            items.append('<li>' + inline(content) + '</li>')
            i += 1
        out.append(f'<{tag}>' + ''.join(items) + f'</{tag}>')
        continue
    paragraph = [line]
    i += 1
    while i < len(lines) and lines[i].strip() and not re.match(r'^(#|\||```|- |\d+\. )', lines[i]):
        paragraph.append(lines[i])
        i += 1
    out.append('<p>' + inline(' '.join(paragraph)) + '</p>')

nav = ''.join(f'<a href="#{slug}">{html.escape(title)}</a>' for slug, title in toc)
css = '''
:root{color-scheme:light;--paper:#f6f5f1;--ink:#172033;--blue:#2457d6}
*{box-sizing:border-box}html{scroll-behavior:auto;scroll-padding-top:28px}
body{margin:0;background:var(--paper);color:var(--ink);font:17px/1.7 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}
.skip{position:absolute;left:12px;top:-100px}.skip:focus{top:10px;background:white;padding:12px;z-index:3}
aside{position:fixed;inset:0 auto 0 0;width:284px;padding:32px 24px;overflow:auto;border-right:1px solid #d9dee7;background:#fff}
.doc-label{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#526071;margin-bottom:20px}
nav a{display:block;color:#172033;text-decoration:none;font-size:13px;line-height:1.45;padding:8px 0}nav a:hover{color:var(--blue);text-decoration:underline}
main{max-width:1120px;margin-left:284px;padding:72px 64px 96px}
h1,h2,h3{color:#000;line-height:1.18;letter-spacing:-.025em;scroll-margin-top:28px}
h1{font-size:48px;max-width:800px;margin:0 0 24px}h2{font-size:31px;margin:72px 0 22px}h3{font-size:22px;margin:32px 0 14px}
p{margin:0 0 19px}h1+p{color:#526071;font-size:14px;margin-bottom:42px}a{color:#1943b5;text-underline-offset:3px;overflow-wrap:anywhere}a:focus-visible,.table-scroll:focus-visible{outline:3px solid #2457d6;outline-offset:4px}
ul,ol{padding-left:25px;margin:18px 0 25px}li{padding-left:4px;margin:9px 0}
code{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:.86em;overflow-wrap:anywhere}p code,td code{background:#e8ecf2;padding:2px 4px;border-radius:3px}
pre{padding:24px;background:#101827;color:#f4f7fc;border-radius:8px;overflow:auto;line-height:1.55;max-width:100%;font-size:13px;margin:24px 0}pre code{font-size:inherit;overflow-wrap:normal}
.table-scroll{overflow-x:auto;margin:24px 0 32px}table{border-collapse:collapse;width:100%;font-size:14px;line-height:1.5}th,td{border:1px solid #d9d9d9;padding:13px 15px;text-align:left;vertical-align:middle}th{background:#273344;color:white;font-weight:600}tbody tr:nth-child(even){background:#eef1f5}tbody tr:nth-child(odd){background:#fff}td:first-child{font-weight:500}th:first-child{width:23%}
footer{margin-top:64px;font-size:13px;color:#526071}.actions{display:flex;gap:16px;font-size:13px;margin:0 0 28px}.actions a{color:#172033}
@media(min-width:1700px){main{margin-left:max(284px,calc((100vw - 1120px)/2));max-width:1120px}}
@media(max-width:1100px){aside{width:240px;padding:24px 18px}main{margin-left:240px;padding:48px 32px}h1{font-size:40px}}
@media(max-width:760px){aside{position:static;width:auto;max-height:260px;border-right:0;border-bottom:1px solid #d9dee7;padding:20px}main{margin:0;padding:36px 20px 64px}h1{font-size:34px}h2{font-size:27px;margin-top:52px}h3{font-size:21px}body{font-size:16px}th,td{min-width:145px;padding:11px}pre{font-size:11px;padding:16px}}
@media print{@page{size:A4;margin:18mm}body{background:white;font-size:10.5pt;line-height:1.5}aside,.skip,.actions{display:none}main{padding:0;margin:0;max-width:none}h1{font-size:28pt}h2{font-size:20pt;margin-top:28pt;break-after:avoid}h3{font-size:14pt;break-after:avoid}p{orphans:3;widows:3}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f1f3f5;color:#172033;font-size:8pt;break-inside:avoid}table{font-size:8.5pt}th{background:#eee;color:#000}thead{display:table-header-group}tr{break-inside:avoid}.table-scroll{overflow:visible}a{color:#172033}footer{display:none}}
'''
document = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Research and detailed redesign specifications for Ravi Mitte’s engineering portfolio."><title>Ravi Mitte Portfolio Research and Redesign Blueprint</title><style>' + css + '</style></head><body><a class="skip" href="#document">Skip to document</a><aside><div class="doc-label">Research and design blueprint<br>16 September 2026</div><nav aria-label="Table of contents">' + nav + '</nav></aside><main id="document"><div class="actions"><a href="portfolio-research-and-blueprint.md">Markdown edition</a><span>Use browser Print to print this document</span></div>' + '\n'.join(out) + '<footer>Research and design specification · Ravi Mitte · September 2026</footer></main></body></html>'
target.write_text(document)
assert len(toc) == 25, len(toc)
assert document.count('<table>') == document.count('</table>')
assert '@@CODE' not in document
assert 'turn2view' not in document
print(f'Created {target.name}: {len(toc)} sections, {len(document):,} characters')
