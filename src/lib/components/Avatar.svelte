<script>
	import avi from '$images/myAvi.jpg';

	let { isClickable = false } = $props();
</script>

{#if isClickable}
	<a href="/about">
		<img src={avi} alt="me" height={40} width={40} class="rounded-full" />
	</a>
{:else}
	<img src={avi} alt="me" height={40} width={40} class="rounded-full" />
{/if}
