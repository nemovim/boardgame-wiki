<script lang="ts">
	function showGrammar(): void {
		alert(`\\ 문법 취소
**굵게**
//기울임//
~~취소선~~
__밑줄__
[[링크]]
((각주))
# 제목
---- 구분선
:(순서 없는 목록
)(두 번째 항목):
:{순서 있는 목록
}{두 번째 항목}:
:[표(0,0)][칸(0,1)
][칸(1,0)][칸(1,1)]:
더 자세한 문법은 "위키:문법" 문서를 참고하세요.`);
	}
</script>

<button onclick={showGrammar}>문법</button>

<style lang="scss">
	@use '../../../style/common/commonBtn.scss';
</style>
