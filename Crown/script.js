const CONFIG = {
    DISCORD_USER_ID: '811321871278145548',
    SPOTIFY_CLIENT_ID: '2b299caa128b498b8e9908932fe23966',
    UPDATE_INTERVAL: 30000,
    SPOTIFY_UPDATE_INTERVAL: 5000
};

let currentDiscordHandle = '@antonh';
let lastDiscordUpdate = 0;
let lastSpotifyUpdate = 0;
let spotifyProgress = 0;
let spotifyDuration = 0;
let spotifyCurrentTime = 0;
let progressInterval = null;
let backgroundMusic = null;
let hasEnteredSite = false;
let isMuted = false;
let currentSpotifyData = null;
let spotifyStartTime = null; // Store the initial start time

// View counter functionality
let viewCount = localStorage.getItem('viewCount') || 12492;

function incrementViewCount() {
    viewCount++;
    localStorage.setItem('viewCount', viewCount);
    updateViewCountDisplay();
}

function updateViewCountDisplay() {
    const viewCountElement = document.getElementById('view-count');
    if (viewCountElement) {
        viewCountElement.textContent = viewCount.toLocaleString();
    }
}

function initializeViewCounter() {
    // Increment view count when they enter the site
    const entryButton = document.getElementById('entry-button');
    if (entryButton) {
        entryButton.addEventListener('click', () => {
            if (!hasEnteredSite) {
                incrementViewCount();
            }
        });
    }
    
    // Update display initially
    updateViewCountDisplay();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeCursor();
    initializeEntryPage();
    initializeSocialLinks();
    initializeViewCounter();
});

function initializeCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    const interactiveElements = document.querySelectorAll('a, .avatar, .main-avatar-img, .album-art, .social-link, .entry-text, .audio-control');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

function initializeEntryPage() {
    const entryPage = document.getElementById('entry-page');
    const entryButton = document.getElementById('entry-button');
    const mainSite = document.getElementById('main-site');
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');
    
    backgroundMusic = document.getElementById('background-music');
    
    // Ensure audio is loaded
    if (backgroundMusic) {
        backgroundMusic.load();
    }
    
    audioControl.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleAudio();
    });
    
    entryButton.addEventListener('click', function() {
        if (hasEnteredSite) return;
        hasEnteredSite = true;
        
        audioControl.classList.add('visible');
        
        if (backgroundMusic && !isMuted) {
            backgroundMusic.currentTime = 0;
            backgroundMusic.volume = 0.6;
            
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isMuted = false;
                }).catch(error => {
                    if (error.name === 'NotAllowedError') {
                        isMuted = true;
                        const audioIcon = document.getElementById('audio-icon');
                        if (audioIcon) {
                            audioIcon.className = 'fas fa-volume-mute';
                        }
                    }
                });
            }
            
            backgroundMusic.addEventListener('ended', function() {
                if (!isMuted) {
                    this.currentTime = 0;
                    this.play();
                }
            });
        }
        
        entryPage.classList.add('fade-out');
        
        setTimeout(() => {
            entryPage.style.display = 'none';
            mainSite.style.display = 'block';
            
            initializeMainSite();
        }, 800);
    });
}

function startAudioIfNeeded() {
    if (backgroundMusic && backgroundMusic.paused && !isMuted) {
        backgroundMusic.volume = 0.6;
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Audio started
            }).catch(error => {
                // Handle error silently
            });
        }
    }
}

function toggleAudio() {
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');
    
    isMuted = !isMuted;
    
    if (isMuted) {
        if (backgroundMusic) {
            backgroundMusic.pause();
        }
        audioIcon.className = 'fas fa-volume-mute';
        audioControl.classList.add('muted');
    } else {
        if (backgroundMusic) {
            backgroundMusic.volume = 0.6;
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Audio started/resumed
                }).catch(error => {
                    // Handle error silently
                });
            }
        }
        
        audioIcon.className = 'fas fa-volume-up';
        audioControl.classList.remove('muted');
    }
}

function initializeMainSite() {
    initializeTypingEffect();
    initializeLastSeen();
    
    // Spam the console with one message
    console.log('get out my console kid');
    console.log('get out my console kid');
    console.log('get out my console kid');
    console.log('get out my console kid');
    console.log('get out my console kid');
    console.log('get out my console kid');
    console.log('get out my console kid');
    console.log('get out my console kid');
    console.log('get out my console kid');
    console.log('get out my console kid');
    
    // Use fake Discord data permanently instead of API calls
    updateDiscordUI({
        discord_status: 'online',
        discord_user: {
            username: 'antonh',
            global_name: 'antonh'
        },
        activities: [{
            type: 0,
            name: 'Visual Studio',
            state: 'Coding in Visual Studio'
        }]
    });
    
    // Initialize fake Spotify data immediately with proper timing
    const now = Date.now();
    const songDuration = (3 * 60 + 39) * 1000; // 3 minutes 39 seconds in milliseconds
    
    // Set the persistent start time only once
    if (!spotifyStartTime) {
        spotifyStartTime = now;
    }
    
    updateSpotifyUI({
        song: 'Teenage Fever',
        artist: 'Drake',
        album_art_url: 'https://i.scdn.co/image/ab67616d0000b2734f0fd9dad63977146e685700',
        timestamps: {
            start: spotifyStartTime, // Use persistent start time
            end: spotifyStartTime + songDuration // End in 3:39 from start
        }
    });
    
    setInterval(updateLastSeen, 1000); // Update every second for real-time sync
    
    setInterval(updateSpotifyProgress, 1000);
    
    // Spam "get out my console kid" every 2 seconds
    setInterval(() => {
        console.log('get out my console kid');
    }, 2000);
}

function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const texts = [
        'made by @antonh',
        'creative developer',
        'digital minimalist',
        'code architect',
        'music enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
}

function initializeLastSeen() {
    updateLastSeen();
}

function updateLastSeen() {
    const lastSeenElement = document.getElementById('last-seen');
    if (!lastSeenElement) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    lastSeenElement.textContent = `Last seen: ${timeString}`;
}

function updateDiscordUI(userData) {
    const avatar = document.getElementById('discord-avatar');
    const username = document.getElementById('discord-username');
    const activity = document.getElementById('discord-activity');
    const statusDot = document.getElementById('discord-status-dot');
    const statusBadge = document.getElementById('discord-status');
    const mainAvatar = document.getElementById('main-avatar');
    const mainStatusDot = document.getElementById('main-status-dot');
    const mainStatusText = document.getElementById('main-status-text');
    
    if (userData && userData.discord_user) {
        // Use actual Discord avatar if available, otherwise use Ken Carson image
        const avatarUrl = userData.discord_user.avatar 
            ? `https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png?size=128`
            : 'https://i1.sndcdn.com/artworks-bRDQNcwB1W1PSNKu-5weSVw-t1080x1080.jpg';
        
        if (avatar) {
            avatar.src = avatarUrl;
        }
        if (mainAvatar) {
            mainAvatar.src = avatarUrl;
        }
        
        if (username) {
            username.textContent = userData.discord_user.global_name || userData.discord_user.username || 'antonh';
        }
    } else {
        // Fallback to Ken Carson image and antonh username
        const defaultAvatarUrl = 'https://i1.sndcdn.com/artworks-bRDQNcwB1W1PSNKu-5weSVw-t1080x1080.jpg';
        if (avatar) {
            avatar.src = defaultAvatarUrl;
        }
        if (mainAvatar) {
            mainAvatar.src = defaultAvatarUrl;
        }
        if (username) {
            username.textContent = 'antonh';
        }
    }
    
    const status = userData && userData.discord_status ? userData.discord_status : 'offline';
    
    if (statusDot) {
        statusDot.className = `status-indicator ${status}`;
    }
    if (statusBadge) {
        statusBadge.className = `status-badge ${status}`;
    }
    if (mainStatusDot) {
        mainStatusDot.className = `status-dot ${status}`;
    }
    
    const statusTexts = {
        'online': 'Online - Available for projects',
        'idle': 'Away - Will reply later',
        'dnd': 'Do Not Disturb - Busy',
        'offline': 'Offline - Leave a message'
    };
    
    if (mainStatusText) {
        mainStatusText.textContent = statusTexts[status] || 'Unknown status';
    }
    
    if (activity) {
        const activityText = activity.querySelector('.activity-text');
        if (activityText) {
            if (userData && userData.activities && userData.activities.length > 0) {
                const customStatus = userData.activities.find(act => act.type === 4);
                if (customStatus) {
                    const emoji = customStatus.emoji ? `${customStatus.emoji.name} ` : '';
                    const state = customStatus.state || '';
                    activityText.textContent = `${emoji}${state}`.trim() || 'Custom Status';
                } else {
                    const currentActivity = userData.activities[0];
                    if (currentActivity.type === 0) { 
                        activityText.textContent = `Playing ${currentActivity.name}`;
                    } else if (currentActivity.type === 2) { 
                        activityText.textContent = `Listening to ${currentActivity.name}`;
                    } else if (currentActivity.type === 3) { 
                        activityText.textContent = `Watching ${currentActivity.name}`;
                    } else {
                        activityText.textContent = currentActivity.name;
                    }
                }
            } else {
                activityText.textContent = statusTexts[status] || 'Offline';
            }
        }
    }
}

function updateSpotifyStatus() {
    // This function is no longer needed as we are using fake data
}

function updateSpotifyProgress() {
    if (!currentSpotifyData) return;
    
    const progressFill = document.getElementById('spotify-progress');
    const currentTimeElement = document.getElementById('current-time');
    const totalTimeElement = document.getElementById('total-time');
    
    const progress = ((Date.now() - currentSpotifyData.timestamps.start) / (currentSpotifyData.timestamps.end - currentSpotifyData.timestamps.start)) * 100;
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    
    if (progressFill) {
        progressFill.style.width = `${clampedProgress}%`;
    }
    
    const currentMs = Date.now() - currentSpotifyData.timestamps.start;
    const totalMs = currentSpotifyData.timestamps.end - currentSpotifyData.timestamps.start;
    
    if (currentTimeElement) {
        currentTimeElement.textContent = formatTime(Math.max(0, currentMs));
    }
    if (totalTimeElement) {
        totalTimeElement.textContent = formatTime(totalMs);
    }
}

function updateSpotifyUI(spotifyData) {
    const trackElement = document.getElementById('spotify-track');
    const artistElement = document.getElementById('spotify-artist');
    const albumElement = document.getElementById('spotify-album');
    const albumContainer = document.querySelector('.album-container');
    const playingIndicator = document.getElementById('spotify-playing');
    const progressContainer = document.getElementById('spotify-progress-container');
    
    currentSpotifyData = spotifyData;
    
    if (spotifyData) {
        if (trackElement) trackElement.textContent = spotifyData.song;
        if (artistElement) artistElement.textContent = spotifyData.artist;
        if (albumElement) {
            albumElement.src = spotifyData.album_art_url;
            albumElement.classList.add('visible');
        }
        if (albumContainer) {
            albumContainer.classList.remove('hidden');
        }
        
        if (playingIndicator) {
            playingIndicator.classList.add('playing');
        }
        
        if (progressContainer) {
            progressContainer.classList.add('visible');
        }
        
        updateSpotifyProgress();
    } else {
        if (trackElement) trackElement.textContent = 'Not playing';
        if (artistElement) artistElement.textContent = '-';
        if (albumElement) {
            albumElement.src = '';
            albumElement.classList.remove('visible'); 
        }
        if (albumContainer) {
            albumContainer.classList.add('hidden');
        }
        if (playingIndicator) {
            playingIndicator.classList.remove('playing');
        }
        if (progressContainer) {
            progressContainer.classList.remove('visible');
        }
    }
}

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function showNotification(title, message, type = 'success', duration = 3000) {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="${icon}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const result = document.execCommand('copy');
            textArea.remove();
            return result;
        }
    } catch (err) {
        console.error('Erreur lors de la copie:', err);
        return false;
    }
}

function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const linkUrl = link.getAttribute('data-link');
            const platform = link.getAttribute('data-platform');
            if (!linkUrl) {
                showNotification(
                    'Error',
                    'No link configured for this platform',
                    'error'
                );
                return;
            }
            link.classList.add('copying');
            setTimeout(() => {
                link.classList.remove('copying');
            }, 150);
            const success = await copyToClipboard(linkUrl);
            if (success) {
                showNotification(
                    `${platform} copied!`,
                    `The link has been copied to your clipboard`,
                    'success'
                );
            } else {
                showNotification(
                    'Copy error',
                    'Could not copy the link automatically',
                    'error'
                );
            }
        });
    });
}