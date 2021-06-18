<script>
    export let initialWidth = 0
    export let initialHeight = 0

    const setWidth = (width = null) => {
        if (width !== null) {
            canvas.width = width
        }
        return canvas.width
    }
    const setHeight = (height = null) => {
        if (height !== null) {
            canvas.height = height
        }
        return canvas.height
    }
    const getCanvas = () => canvas

    export {
        setWidth as width,
        setHeight as height,
        getCanvas as canvas,
    }

    let canvas = null
    $: drawContext = canvas?.getContext("2d")

    export const context = () => drawContext
</script>

<canvas bind:this={canvas} width={initialWidth} height={initialHeight} />
