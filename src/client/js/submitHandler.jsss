jest.useFakeTimers();
const submitHandler = async (event) => {
    let apiConfig = {};
    console.log("hiii");
    event.preventDefault();
    const urlToAnalyse = document.getElementById('input-url').value;
    if (urlToAnalyse) {

        await Client.getConfig().then((data) => {
            console.log('apiConfig')
            const rr = data;
            console.log(rr)
            apiConfig = rr;
        }).catch((error) => {
            console.log('error apiConfig')
            console.log(error)
            document.querySelectorAll('.error')[0].style.display = "block";
            document.querySelectorAll('.form')[0].style.display = "none";
            document.getElementById('error-descroption').innerHTML = error;
        });
        console.log('URL to be analyzed :');
        console.log(apiConfig.application_url + apiConfig.application_key + '&url=' + urlToAnalyse);
        Client.readInfos(apiConfig.application_url, apiConfig.application_key + '&url=', urlToAnalyse).then((data) => {
            console.log("final data");
            console.log(data);
            document.querySelectorAll('#errors-feedback')[0].style.display = "none";
            document.querySelectorAll('#results')[0].style.display = "block";
            document.getElementById('urlValidity').innerHTML = data.urlValidity;
            document.getElementById('subjectivity').innerHTML = data.subjectivity;
            document.getElementById('polarity').innerHTML = data.poloarity;
            document.getElementById('irony').innerHTML = data.irony;
            document.getElementById('agreement').innerHTML = data.agreement;
        }).catch((error) => {
           // console.log("errors final data");
            console.log(error);
            document.querySelectorAll('#errors-feedback')[0].style.display = "block";
            document.querySelectorAll('#results')[0].style.display = "none";
            document.getElementById('error-descroption').innerHTML = " The data can  t be fetched, either disconnected or other error";

        });
    }
    else
        alert("The url , you tried to analyse is empty,please provide a valid address.")
}

export { submitHandler }