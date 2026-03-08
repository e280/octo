
import {Status} from "../model/types.js"

export function indicator(status: Status) {
	switch (status) {
		case "happy": return " "
		case "angry": return "!"
		case "done": return "◦"
		case "failed": return "x"
	}
}

