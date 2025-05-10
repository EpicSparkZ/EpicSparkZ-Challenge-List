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
        let [leaderboard, err] = await fetchLeaderboard();
        leaderboard = leaderboard.filter(entry => entry.user !== 'N/A');
        this.leaderboard = leaderboard;
        this.err = err;
        this.loading = false;
        this.applyRankEffects();
    },
    methods: {
        localize,
        applyRankEffects() {
            this.$nextTick(() => {
                const applyEffect = (index, color, animationName) => {
                    const rank = document.querySelector(`#rank-${index}`);
                    const user = document.querySelector(`#user-${index}`);
                    const total = document.querySelector(`#total-${index}`);
                    [rank, user, total].forEach(el => {
                        if (el) this.addGlowEffect(el, color, animationName);
                    });
                };
                applyEffect(0, '#FFD700', 'breathingGold');
                applyEffect(1, '#C0C0C0', 'breathingSilver');
                applyEffect(2, '#CD7F32', 'breathingBronze');
            });
        },
        addGlowEffect(element, color, animationName) {
            element.style.transition = "all 0.5s ease-in-out";
            element.style.fontWeight = 'bold';
            element.style.color = color;
            element.style.animation = `${animationName} 3s infinite alternate`;
        }
    },
};

const style = document.createElement('style');
style.innerHTML = `
    @keyframes breathingGold {
        0% {
            text-shadow: 0 0 5px rgba(255, 215, 0, 0.0);
        }
        100% {
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.65);
        }
    }
    @keyframes breathingSilver {
        0% {
            text-shadow: 0 0 5px rgba(192, 192, 192, 0.0);
        }
        100% {
            text-shadow: 0 0 20px rgba(192, 192, 192, 0.65);
        }
    }
    @keyframes breathingBronze {
        0% {
            text-shadow: 0 0 5px rgba(205, 127, 50, 0.0);
        }
        100% {
            text-shadow: 0 0 20px rgba(205, 127, 50, 0.65);
        }
    }
`;
document.head.appendChild(style);
