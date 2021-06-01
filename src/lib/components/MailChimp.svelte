<script lang="ts">
    import validator from 'validator';
    import { post } from "../../lib/scripts/utility"
    import Button from "$lib/components/Button.svelte"
    import { createEventDispatcher } from "svelte"
    
    const dispatch = createEventDispatcher()
    
    let email: string = ""
    let phone: string
    
    async function submit() {
        try {
            const result = await post("/api/subscribe.json", { email, phone })
            dispatch("submit")
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    
    let clazz = ""
    export { clazz as class }
</script>

<div class="{clazz} flex flex-col mx-4 w-full sm:w-60 text-white text-center rounded space-y-1 py-2 px-4" style="background-color: rgba(0,0,0,0.75)">
    <input required class="bg-transparent px-2" type="email" placeholder="Email" bind:value={email}/>
    <input class="bg-transparent px-2" type="tel" placeholder="Phone" bind:value={phone} />
    {#if validator.isEmail(email)}
        <Button class="text-gray-100" disabled={!email} on:click={submit}>Submit</Button>
    {/if}
</div>


<style>
    input:invalid {
        color: red;
    }
</style>