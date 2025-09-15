const smallCups = document.querySelectorAll('.cup-small'); //array
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

const TOTAL_LITERS = 2;   // goal
const ML_PER_CUP = 250;   // each small cup

updateBigCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(idx) {
  const lastIndex = smallCups.length - 1;

  // SPECIAL RULE FOR LAST CUP:
  // Do NOT fill all cups when the last one is clicked.
  // Just toggle ONLY the last cup on/off.
  if (idx === lastIndex) {
    smallCups[idx].classList.toggle('full');
    updateBigCup();
    return;
  }

  // For all other cups, keep the "fill up to here" behavior,
  // with the standard tail-toggle-off rule:
  const current = smallCups[idx];
  const next = current.nextElementSibling;

  if (
    current.classList.contains('full') &&
    (!next || !next.classList.contains('full'))
  ) {
    idx--;
  }

  smallCups.forEach((cup, i) => {
    cup.classList.toggle('full', i <= idx);
  });

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
    percentage.textContent = '';
  } else {
    percentage.style.visibility = 'visible';
    const height = (fullCups / totalCups) * 330; // 330px = big cup height
    percentage.style.height = `${height}px`;
    percentage.textContent = `${Math.round((fullCups / totalCups) * 100)}%`;
  }

  const litersDrank = (fullCups * ML_PER_CUP) / 1000;
  const litersLeft = Math.max(TOTAL_LITERS - litersDrank, 0);

  if (fullCups === totalCups) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
  } else {
    remained.style.visibility = 'visible';
    liters.textContent = `${litersLeft.toFixed(litersLeft % 1 === 0 ? 0 : 2)}L`;
  }
}
