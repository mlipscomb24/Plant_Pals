const plantApiService = require("./services/plantApiService");

async function runTest() {
  try {
    console.log("Testing searchPlants function...");
    const searchResults = await plantApiService.searchPlants("Sunflower");
    console.log("SearchPlants successful!");
    console.log("Search Results:", JSON.stringify(searchResults, null, 2));

    if (searchResults.length > 0) {
      console.log("\nTesting getPlantDetails function...");
      const detailsResult = await plantApiService.getPlantDetails(
        searchResults[0]._id
      );
      console.log("GetPlantDetails successful!");
      console.log("Plant Details:", JSON.stringify(detailsResult, null, 2));
    }
  } catch (error) {
    console.error("API test failed:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", await error.response.text());
    }
  }
}

runTest();
