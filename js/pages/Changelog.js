export default {
  name: 'Changelog',
  mounted() {
    // Redirect to the new changelog site
    window.location.href = 'https://eclchangelog.pages.dev';
  },
  render() {
    // Optional: Return null or a placeholder while redirecting
    return null;
  }
};
