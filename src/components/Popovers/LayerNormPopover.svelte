<script lang="ts">
	import type { PopoverProps } from 'flowbite-svelte/Popover.svelte';
	import CommonPopover from './CommonPopover.svelte';

	export let offset: PopoverProps['offset'] = undefined;
	export let className: PopoverProps['class'] = undefined;
	export let triggeredBy: PopoverProps['triggeredBy'] = undefined;
	export let trigger: PopoverProps['trigger'] = undefined;
	export let placement: PopoverProps['placement'] = undefined;
</script>

<CommonPopover
	className="ln-popover"
	title="층 정규화"
	{offset}
	{triggeredBy}
	{trigger}
	{placement}
	goTo="article-ln"
>
	<div class="ln-content">
		안정성을 위해 층의 입력이 표준 분포를 갖도록 정규화합니다.
	</div></CommonPopover
>

<style lang="scss">
	.ln-content {
		width: 12rem;
	}
</style>
