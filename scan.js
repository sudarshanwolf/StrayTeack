
function closePetCard() {
    document.querySelector('.pet-card').style.display = 'none';
}
function displayQRCodeData(dogInfo) {
    const lines = dogInfo.split('\n');
    const petCard = document.querySelector('.pet-card');

    petCard.style.display = 'block';

    lines.forEach(line => {
        const [key, value] = line.split(':');

        switch (key.trim()) {
            case 'Name':
                document.querySelector('.pet-name').textContent = value.trim();
                break;
            case 'DOGID':
                document.querySelector('.pet-id').textContent = `ID: ${value.trim()}`;
                break;
            case 'Breed':
                document.querySelector('#breed').textContent = value.trim();
                break;
            case 'Color':
                document.querySelector('#color').textContent = value.trim();
                break;
            case 'Age':
                document.querySelector('#age').textContent = value.trim();
                break;
            case 'Location':
                document.querySelector('#location').textContent = value.trim();
                break;
            case 'Last Seen':
                document.querySelector('#last-seen').textContent = value.trim();
                break;
            case 'Vaccinated':
                const vaccinatedStatus = value.trim().toLowerCase() === 'yes' ? 'Yes ✓' : 'No ✘';
                if (vaccinatedStatus === "No ✘") {
                    document.querySelector('#vaccinated .status-badge').style.background = '#ef233c';
                    document.querySelector('#vaccinated .status-badge').style.color = '#ffffff';
                    document.querySelector('#vaccinated .status-badge').textContent = vaccinatedStatus;
                }
                else {
                    document.querySelector('#vaccinated .status-badge').style.background = '#55efc4';
                    document.querySelector('#vaccinated .status-badge').style.color = '#00b894';
                    document.querySelector('#vaccinated .status-badge').textContent = vaccinatedStatus;
                }
                break;
            case 'Diseases':
                document.querySelector('#health').textContent = value.trim();
                break;
            case 'Owner':
                document.querySelector('#owner').textContent = value.trim();
                break;
        }
    });
}

let scanner;
let currentCameraIndex = 0;
let cameras = [];

document.addEventListener("DOMContentLoaded", () => {
    scanner = new Instascan.Scanner({ video: document.getElementById('qr-preview') });

    scanner.addListener('scan', (content) => {
        if (content) {
            scanner.stop().then(() => {
                fetchDogDetails(content)
            }).catch((err) => {
                console.error("Error stopping scanner: ", err);
            });
            displayQRCodeData(content);
        } else {
            alert('Not a valid StrayTrack QR code.');
        }
    });

    document.getElementById('startCamera').addEventListener('click', () => {
        Instascan.Camera.getCameras().then((availableCameras) => {
            cameras = availableCameras;
            if (cameras.length > 0) {
                scanner.start(cameras[currentCameraIndex]).then(() => {
                }).catch((err) => {
                });
            } else {
                alert('No cameras found.');
            }
        }).catch((err) => {
        });
    });

    document.getElementById("stopCamera").addEventListener('click', () => {
        scanner.stop().then(() => {
        }).catch((err) => {
        });
    });

    document.getElementById('flipCamera').addEventListener('click', () => {
        if (cameras.length > 1) {
            scanner.stop().then(() => {
                currentCameraIndex = (currentCameraIndex + 1) % cameras.length;
                scanner.start(cameras[currentCameraIndex]).then(() => {
                }).catch((err) => {
                });
            }).catch((err) => {
            });
        } else {
            alert('No alternative cameras found.');
        }
    });
});


const lazyLoaders = document.querySelectorAll('.lazy-loader');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});


lazyLoaders.forEach(loader => {
    observer.observe(loader);
});
function contactOwner() {
    const ownerContact = document.getElementById('owner').value;
    if (ownerContact) {
        window.location.href = `tel:${ownerContact}`;
    } else {
        alert('Owner contact not available!');
    }
}