document.addEventListener('DOMContentLoaded', () => {
    console.log("BLOOP website loaded - PrivacyTag™ LLC");
    // Add a subtle hover effect hint for links
    const links = document.querySelectorAll('.contacts a, .github a');
    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.color = '#b2ffff';
        });
        link.addEventListener('mouseout', () => {
            link.style.color = '#00e5e5';
        });
    });
});