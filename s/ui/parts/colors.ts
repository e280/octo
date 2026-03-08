
const c = (n: number) => `\x1b[${n}m`

export const color = {
	clear: `\x1b[2J\x1b[H`,

	reset: {
		all: c(0),
		text: c(39),
		bg: c(49),
		boldDim: c(22),
		italic: c(23),
		underline: c(24),
		inverse: c(27),
		hidden: c(28),
		strikethrough: c(29),
	},

	bold: c(1),
	dim: c(2),
	italic: c(3),
	underline: c(4),
	inverse: c(7),
	hidden: c(8),
	strikethrough: c(9),

	x: (n: number) => `\x1b[38;5;${n}m`,
	black: c(30),
	red: c(31),
	green: c(32),
	yellow: c(33),
	blue: c(34),
	magenta: c(35),
	cyan: c(36),
	white: c(37),
	bright: {
		black: c(90),
		red: c(91),
		green: c(92),
		yellow: c(93),
		blue: c(94),
		magenta: c(95),
		cyan: c(96),
		white: c(97),
	},

	bg: {
		x: (n: number) => `\x1b[48;5;${n}m`,
		black: c(40),
		red: c(41),
		green: c(42),
		yellow: c(43),
		blue: c(44),
		magenta: c(45),
		cyan: c(46),
		white: c(47),
		bright: {
			black: c(100),
			red: c(101),
			green: c(102),
			yellow: c(103),
			blue: c(104),
			magenta: c(105),
			cyan: c(106),
			white: c(107),
		},
	},
}

