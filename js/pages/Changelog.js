export default {
  name: 'Changelog',
  mounted() {
    // Use Vue's nextTick to ensure the redirect happens after mounting
    this.$nextTick(() => {
      window.location.href = 'https://eclchangelog.pages.dev';
    });
  },
  render() {
    return null; // You can return null or a placeholder
  }
};
