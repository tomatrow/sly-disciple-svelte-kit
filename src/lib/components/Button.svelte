<script lang="ts">
    export let type: "button" | "submit" | "reset" = "button"
    export { clazz as class }
    
    let clazz = ""
</script>

<button {type} class={clazz} on:click {...$$restProps}><slot /></button>