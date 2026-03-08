
import {Status} from "../state/types.js"

export function indicator(status: Status) {
	switch (status) {
		case "happy": return " "
		case "angry": return "!"
		case "done": return "◦"
		case "failed": return "x"
	}
}

