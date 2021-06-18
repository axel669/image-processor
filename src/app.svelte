<script>
    import AppStyle from "svelte-doric/core/app-style"
    import baseline from "svelte-doric/core/baseline"
    import theme from "svelte-doric/core/theme/tron"

    import Pica from "pica"

    import Canvas from "./canvas.svelte"

    const pica = Pica()

    let emote = ""
    let sourceURL = ""
    let source = null
    const preview = {
        112: null,
        56: null,
        28: null,
    }
    const downloadURL = {
        112: null,
        56: null,
        28: null,
    }

    const loadFileURL = (file) => new Promise(
        (resolve) => {
            const reader = new FileReader()
            reader.addEventListener(
                "load",
                () => resolve(reader.result)
            )
            reader.readAsDataURL(file)
        }
    )
    const loadImage = (file) => new Promise(
        async (resolve) => {
            const img = new Image()
            const url = await loadFileURL(file)

            img.addEventListener(
                "load",
                () => resolve(img)
            )
            img.src = url
        }
    )

    const setupDrop = (evt) => {
        evt.dataTransfer.dropEffect = "move"
        evt.preventDefault()
        evt.stopPropagation()
    }

    const renderPreview = async (evt) => {
        evt.preventDefault()
        sourceURL = await loadFileURL(evt.dataTransfer.files[0])
        downloadURL[112] = null
        downloadURL[56] = null
        downloadURL[28] = null
    }
    const genResizes = async () => {
        for (const size of [28, 56, 112]) {
            preview[size].getContext("2d").clearRect(0, 0, size, size)
            await pica.resize(
                source,
                preview[size],
                {
                    alpha: true,
                }
            )
            downloadURL[size] = preview[size].toDataURL("image/png")
        }
    }
</script>

<style>
    app-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        max-width: 720px;
        margin: auto;
        gap: 4px;
    }

    drop-zone {
        grid-column: span 2;
        display: grid;
        height: 320px;
        border: 3px solid var(--primary);
        grid-template-columns: 1fr;
        grid-template-rows: auto min-content;
        border-radius: 4px;
    }
    drop-zone > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        width: 100%;
        height: 280px;
        object-fit: contain;
        border-width: 0px;
    }
    img:not([src]) {
        opacity: 0;
    }

    preview-area {
        display: flex;
        flex-direction: column;
        padding: 4px;
        height: 152px;
        align-items: center;
        justify-content: center;

        border: 3px solid var(--primary);
        border-radius: 4px;
    }

    a, a:visited {
        color: var(--text-normal);
    }
    a:hover {
        color: var(--secondary);
    }
</style>

<AppStyle {baseline} {theme} />

<app-layout>
    <drop-zone on:dragover={setupDrop} on:drop={renderPreview}>
        <div>
            Drop image to convert
        </div>
        <img src={sourceURL} alt="" bind:this={source} on:load={genResizes} />
    </drop-zone>

    {#each [112, 56, 28] as size}
        <preview-area>
            <canvas bind:this={preview[size]} width={size} height={size} />
            {#if downloadURL[size]}
                <a href={downloadURL[size]} download="{emote}-{size}.png">
                    Download {size}x{size}
                </a>
            {/if}
        </preview-area>
    {/each}
</app-layout>
