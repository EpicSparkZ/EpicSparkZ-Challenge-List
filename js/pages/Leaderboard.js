import { fetchLeaderboard } from '../content.js';
import { localize } from '../util.js';

import Spinner from '../components/Spinner.js';

export default {
    components: {
        Spinner,
    },
    data: () => ({
        leaderboard: [],
        loading: true,
        selected: 0,
        err: [],
    }),
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-leaderboard-container">
            <div class="page-leaderboard">
                <div class="error-container">
                    <p class="error" v-if="err.length > 0">
                        Leaderboard may be incorrect, as the following levels could not be loaded: {{ err.join(', ') }}
                    </p>
                </div>
                <div class="board-container">
                    <table class="board">
                        <tr v-for="(ientry, i) in leaderboard">
                            <td class="rank">
                                <p class="type-label-lg" :id="'rank-' + i">#{{ i + 1 }}</p>
                            </td>
                            <td class="total">
                                <p class="type-label-lg" :id="'total-' + i">{{ localize(ientry.total) }}</p>
                            </td>
                            <td class="user" :class="{ 'active': selected == i }">
                                <button @click="selected = i">
                                    <span class="type-label-lg" :id="'user-' + i">{{ ientry.user }}</span>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="player-container">
                    <div class="player">
                        <h1>#{{ selected + 1 }} {{ entry.user }}</h1>
                        <h3>{{ entry.total }}</h3>
                        <h2 v-if="entry.verified.length > 0">Verified ({{ entry.verified.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.verified">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                        <h2 v-if="entry.completed.length > 0">Completed ({{ entry.completed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.completed">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                        <h2 v-if="entry.progressed.length > 0">Progressed ({{entry.progressed.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.progressed">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    `,
    computed: {
        entry() {
            return this.leaderboard[this.selected];
        },
    },
    async mounted() {
        const [leaderboard, err] = await fetchLeaderboard();
        this.leaderboard = leaderboard;
        this.err = err;
        // Hide loading spinner
        this.loading = false;
        
        // Apply golden color and breathing effect to the first place user's rank, name, and score
        this.applyGoldEffect();
    },
    methods: {
        localize,
        applyGoldEffect() {
            // Wait until the DOM has fully rendered to apply the effect
            this.$nextTick(() => {
                const firstPlaceRank = document.querySelector('#rank-0');
                const firstPlaceUsername = document.querySelector('#user-0');
                const firstPlaceTotal = document.querySelector('#total-0');
                
                if (firstPlaceRank && firstPlaceUsername && firstPlaceTotal) {
                    this.addGoldColorWithBreathingEffect(firstPlaceRank);
                    this.addGoldColorWithBreathingEffect(firstPlaceUsername);
                    this.addGoldColorWithBreathingEffect(firstPlaceTotal);
                }
            });
        },
        addGoldColorWithBreathingEffect(element) {
            // Apply a golden color with a breathing effect to text itself
            const goldColor = '#FFD700';  // Lighter gold color
            element.style.transition = "all 0.5s ease-in-out";
            element.style.fontWeight = 'bold';
            element.style.color = goldColor; // Set the gold color

            // Add the breathing golden glow using text-shadow (instead of box-shadow)
            element.style.animation = "breathingGlow 2s infinite alternate";
        }
    },
};

// Add the breathing glow animation in CSS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes breathingGlow {
        0% {
            text-shadow: 0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700, 0 0 20px #FFD700;
        }
        100% {
            text-shadow: 0 0 20px #FFD700, 0 0 30px #FFD700, 0 0 40px #FFD700, 0 0 50px #FFD700;
        }
    }
`;
document.head.appendChild(style);
