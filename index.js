// Gujarat Titans Squad
const gujaratTitans = {'cuurn': 90, 'A singh': 29, 'rabada': 54, 'short': 57, 'j sharma': 14, 's raza': 122, 's khn': 66, 'h singh': 37, 'taide': 4, 'r chr': 4, 'brar': 4};

// Rajasthan Royals Squad
const rajasthanRoyals = {'poran': 10, 'rahul': 106, 'wod': 54, 'mayer': 40, 'stonis': 41, 'pndya': 55, 'bhisnoi': 57, 'a khn': 12, 'y singh': 64};

// Define fixed players
const fixedPlayers = ['rahul','cuurn','rabada','wod'];

// Generate a new Dream 11 team and update the HTML
function generateNewTeam() {
    // Randomly select remaining players for the Dream 11 team from both arrays
    const remainingGujaratPlayers = Object.entries(gujaratTitans).filter((player) => !fixedPlayers.includes(player[0]));
    const remainingRajasthanPlayers = Object.entries(rajasthanRoyals).filter((player) => !fixedPlayers.includes(player[0]));
    const dream11 = [...getRandomElementsFromArray(remainingGujaratPlayers, 3), ...getRandomElementsFromArray(remainingRajasthanPlayers, 4)];

    // Add fixed players to the Dream 11 team
    for (let player of fixedPlayers) {
        if (gujaratTitans.hasOwnProperty(player)) {
            dream11.push([player, gujaratTitans[player]]);
        } else {
            dream11.push([player, rajasthanRoyals[player]]);
        }
    }

    // Randomly assign captain and vice-captain for the Dream 11 team
    const captain = getRandomElementFromArray(dream11);
    dream11.splice(dream11.indexOf(captain), 1);
    const viceCaptain = getRandomElementFromArray(dream11);
    dream11.push(captain);

    // Calculate total points of the team
    let totalPoints = 0;
    for (let i = 0; i < dream11.length; i++) {
        const player = dream11[i];
        if (player[0] === captain[0]) {
            totalPoints += player[1] * 2;
        } else if (player[0] === viceCaptain[0]) {
            totalPoints += player[1] * 1.5;
        } else {
            totalPoints += player[1];
        }
    }

    // Clear previous team and generate a new table with the final Dream 11 team and total points
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    for (let i = 0; i < dream11.length; i++) {
        const player = dream11[i];
        const row = tableBody.insertRow(i);
        const type = (player[0] === captain[0]) ? 'Captain' : (player[0] === viceCaptain[0]) ? 'Vice-Captain' : 'Player';
        const points = (player[0] === captain[0]) ? player[1] * 2 : (player[0] === viceCaptain[0]) ? player[1] * 1.5 : player[1];
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${player[0]}</td>
            <td>${type}</td>
            <td>${points}</td>
        `;
    }
    document.querySelector('#captain').textContent = `${captain[0]} (${captain[1] * 2} points)`;
    document.querySelector('#vice-captain').textContent = `${viceCaptain[0]} (${viceCaptain[1] * 1.5} points)`;
    document.querySelector('#total-points').textContent = totalPoints;
}

// Generate a new Dream 11 team when the button is clicked
document.querySelector('#generate-button').addEventListener('click', generateNewTeam);

// Helper functions
function getRandomElementFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomElementsFromArray(arr, n) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}