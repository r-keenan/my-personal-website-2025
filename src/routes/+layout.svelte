<script lang="ts">
	import '../app.css';
	import NavBar from '$components/NavBar.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<NavBar />
	<main class="flex-grow">{@render children()}</main>
</div>
