export function populateTotal(transactions) {
  let total = transactions.reduce((total, t) => total + parseFloat(t.value), 0);

  let totelEl = document.querySelector('#total');
  totelEl.textContent = total;
}

export function populateTable(transactions) {
  let tBody = document.querySelector('#tbody');
  tBody.innerHTML = '';

  transactions.forEach((transaction) => {
    let tran = document.createElement('tr');
    tran.innerHTML = `
      <th>${transaction.name}</th>
      <th>${transaction.value}</th>`;

    tBody.appendChild(tran);
  });
}

let chart;
export function popChart(transactions) {
  let rev = transactions.slice().reverse();
  let sum = 0;

  let label = rev.map((t) => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  });

  let data = rev.map((t) => {
    sum += parseInt(t.value);
    return sum;
  });

  if (chart) {
    chart.destroy();
  }

  let graph = document.getElementById('myChart').getContext('2d');

  chart = new chart(graph, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Total through time',
          fill: true,
          borderColor: 'black',
          backgroundColor: 'white',
          data,
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Balance'
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
          },
          y: {
            title: {
              display: true,
              text: 'Balance'
            },
            beginAtZero: true,
          },
        },

      }
    }
  })
};

export default function updateDisplay(transactions) {
  populateTable(transactions);
  populateTotal(transactions);
  popChart(transactions);
};