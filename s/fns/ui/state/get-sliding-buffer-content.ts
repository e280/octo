
import {SlidingBuffer} from "./types.js"

export function getSlidingBufferContent({$data, $length}: SlidingBuffer) {
	return $data().slice($data().length - $length())
}

