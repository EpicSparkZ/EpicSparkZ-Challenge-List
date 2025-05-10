async mounted() {
    this.list = await fetchList();
    this.editors = await fetchEditors();

    if (!this.list) {
        this.errors = [
            "Failed to load list. Retry in a few minutes or notify list staff.",
        ];
    } else {
        this.errors.push(
            ...this.list
                .filter(([_, err]) => err)
                .map(([_, err]) => `Failed to load level. (${err}.json)`)
        );
        if (!this.editors) {
            this.errors.push("Failed to load list editors.");
        }
    }

    this.startRainbowEffect();
    this.loading = false;
},
methods: {
    embed,
    score,
    startRainbowEffect() {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 5) % 360;
            const el = this.$refs.rainbowTitle;
            if (el) {
                el.style.color = `hsl(${hue}, 100%, 65%)`;
                el.style.textShadow = `0 0 8px hsla(${hue}, 100%, 65%, 0.90)`;
            }
        }, 85);
    },
},
