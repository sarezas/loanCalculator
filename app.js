// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // hide results
    document.getElementById('results').style.display = 'none';
    // show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// calc. results
function calculateResults() {
    // UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12; 
    
    //calc. monthly pay.
    const s = Math.pow(1 + calculatedInterest, calculatedPayments);  
    const monthly = (principal * s * calculatedInterest) / (s-1);

    if (isFinite(monthly)) {
        monthlyPayment.value  = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // show results
        document.getElementById('results').style.display = 'block';
        // hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check the numbers!');
    }
}

function showError(error){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    // create an error div
    const errorDiv = document.createElement('div');
    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');    
    // add class
    errorDiv.className = 'alert alert-danger';
    // create text node
    errorDiv.appendChild(document.createTextNode(error));
    // insert error above head
    card.insertBefore(errorDiv, heading);  
    // remove error after three secs.
    setTimeout(clearError, 4000);                      
}

// clear error
function clearError(){
    document.querySelector('.alert').remove();
}
