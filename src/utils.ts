export function escapeHtml(html: string) {
	var text = document.createTextNode(html)
	var p = document.createElement('p')
	p.appendChild(text)
	return p.innerHTML
}
