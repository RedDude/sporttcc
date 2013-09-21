/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-Tempos' : '&#xe000;',
			'icon-mensage' : '&#xe001;',
			'icon-gol' : '&#xe002;',
			'icon-card' : '&#xe003;',
			'icon-animation' : '&#xe009;',
			'icon-dl' : '&#xe00a;',
			'icon-dr' : '&#xe00b;',
			'icon-ul' : '&#xe00c;',
			'icon-ur' : '&#xe00d;',
			'icon-loop' : '&#xe004;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};