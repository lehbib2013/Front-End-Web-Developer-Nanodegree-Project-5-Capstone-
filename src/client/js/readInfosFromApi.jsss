jest.useFakeTimers();
const readInfos = async (baseUrl, apiKey, urlToAnalyse) => {
  const isValid = Client.isValidURL(urlToAnalyse);
  console.log("isValid");
  console.log(isValid);
  console.log(baseUrl + apiKey + urlToAnalyse);
  const response = (isValid ? await fetch(baseUrl + apiKey + urlToAnalyse) : { urlValidity: "Not Valid URL", subjectivity: "Not applied", ploarity: "Not applied", irony: "Not applied", agreement: "Not applied" });
  let ploarity = 'No plolarity was provided';
  try {
    const data = isValid ? await response.json() : response;
    console.log("Calling Meaningcloud API ...");
    if (data.score_tag === 'P+') ploarity = 'Strongly Positive';
    if (data.score_tag === 'P') ploarity = 'Fairly Positive';
    if (data.score_tag === 'NEU') ploarity = 'Neutral';
    if (data.score_tag === 'N') ploarity = 'Negative';
    if (data.score_tag === 'N+') ploarity = 'Strongly Negative';
    if (data.score_tag === 'NON') ploarity = 'Without Sentiment';
    if (data.score_tag === 'Not applied') ploarity = 'Not applied';
    let formatedReturnedData = { urlValidity: "Valid URL", subjectivity: data.subjectivity, poloarity: ploarity, irony: data.irony, agreement: data.agreement };
    console.log(formatedReturnedData);
    return await formatedReturnedData;
  } catch (error) {
    console.log("Errors hapemed when calling Meaningcloud API...");
    console.log(error);
  }
}
export { readInfos }