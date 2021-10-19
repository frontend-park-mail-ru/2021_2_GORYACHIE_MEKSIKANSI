console.log('HERE');

document.querySelector('.promo-line').scroll({
    behavior: 'smooth',
})

const turnLeft = () => {

}

const turnRight = () => {
    document.querySelector('.promo-line').scrollLeft += 300;
}

document.querySelector('.left').addEventListener('click', turnLeft);
document.querySelector('.right').addEventListener('click', turnRight);