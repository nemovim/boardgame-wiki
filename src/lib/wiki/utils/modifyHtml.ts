import { decodeFullTitle } from '@nemowiki/core/client';

export default function modifyHtmlByExistenceOfLinks(html: string, fullTitleArr: string[]): string {
	return html.replaceAll(/href="\/r\/(.*?)"/g, (matched, captured) => {
		if (fullTitleArr.indexOf(decodeFullTitle(captured.split('#')[0])) === -1) {
			return `class="nonexistent-link" ${matched}`;
		} else {
			return matched;
		}
	});
}
