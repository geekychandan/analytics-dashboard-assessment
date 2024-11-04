// src/data/csvDataProcessor.js
import Papa from "papaparse";

// Cache objects for lazy-loaded data
let csvDataCache = null;
let summaryMetricsCache = null;
let evPopularityMetricsCache = null;
let vehiclePerformanceMetricsCache = null;
let marketTrendsMetricsCache = null;

<<<<<<< HEAD
export const loadCSVData = async () => {
  if (csvDataCache) {
    return csvDataCache;
  }

  const tempDataCache = [];
  const filePath = "./Electric_Vehicle_Population_Data.csv";

  try {
    const response = await fetch(filePath);
    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Process each chunk (e.g., parse CSV data)
      // Modify this part according to your specific parsing needs
      const chunkText = new TextDecoder().decode(value);
      const chunkData = Papa.parse(chunkText, { header: true });
      tempDataCache.push(...chunkData.data);
      csvDataCache = tempDataCache;
    }
    return csvDataCache;
  } catch (error) {
    console.error("Error loading CSV data:", error);
    throw error;
  }
};

// Load CSV data efficiently with PapaParse
// export const loadCSVData = async () => {
//   if (csvDataCache) return csvDataCache;

//   return new Promise((resolve, reject) => {
//     const tempDataCache = []; // Temporary array to hold chunks

//     Papa.parse("./Electric_Vehicle_Population_Data.csv", {
//       header: true,
//       skipEmptyLines: true,
//       dynamicTyping: true,
//       download: true,
//       chunk: (results) => {
//         console.log("Chunk Size:", results.data.length);
//         tempDataCache.push(...results.data); // Store chunks temporarily
//       },
//       complete: () => {
//         csvDataCache = tempDataCache; // Concatenate all chunks
//         console.log("Total Entries:", csvDataCache.length);
//         resolve(csvDataCache);
//       },
//       error: (error) => reject(error),
//     });
//   });
// };
=======
// Load CSV data efficiently with PapaParse
export const loadCSVData = async () => {
  if (csvDataCache) return csvDataCache;

  return new Promise((resolve, reject) => {
    const tempDataCache = []; // Temporary array to hold chunks

    Papa.parse("./Electric_Vehicle_Population_Data.csv", {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      download: true,
      chunk: (results) => {
        console.log("Chunk Size:", results.data.length);
        tempDataCache.push(...results.data); // Store chunks temporarily
      },
      complete: () => {
        csvDataCache = tempDataCache; // Concatenate all chunks
        console.log("Total Entries:", csvDataCache.length);
        resolve(csvDataCache);
      },
      error: (error) => reject(error),
    });
  });
};
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325

// Summary Metrics Calculation
export const calculateSummaryMetrics = async () => {
  if (summaryMetricsCache) return summaryMetricsCache;
  const data = await loadCSVData();

  // Total EV count
  const totalEVs = data.length;

  let highestCountyRange = 0;
<<<<<<< HEAD
  let highestCountyName = "";

=======
  let highestCountyName = '';
  
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325
  // Use reduce to calculate total ranges and count per year
  const rangeByYear = data.reduce((acc, item) => {
    const year = parseInt(item["Model Year"], 10); // Ensure Model Year is an integer
    const range = item["Electric Range"]
      ? parseInt(item["Electric Range"], 10)
      : 0; // Parse Electric Range
<<<<<<< HEAD

=======
  
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325
    // Only proceed if year and range are valid numbers
    if (!isNaN(year) && !isNaN(range) && range > 0) {
      // Initialize year entry if it doesn't exist
      if (!acc[year]) {
        acc[year] = { totalRange: 0, count: 0 };
      }
<<<<<<< HEAD

      // Update the total range and count for the year
      acc[year].totalRange += range;
      acc[year].count += 1;

=======
      
      // Update the total range and count for the year
      acc[year].totalRange += range;
      acc[year].count += 1;
  
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325
      // Check for the highest range and update if necessary
      if (range > highestCountyRange) {
        highestCountyRange = range;
        highestCountyName = item.County; // Store the county name
      }
    }
    return acc;
  }, {});
  // Calculate average range by year
  const avgRangeByYear = Object.entries(rangeByYear)
    .map(([year, { totalRange, count }]) => ({
      year: parseInt(year, 10),
      avgRange: totalRange / count,
    }))
    .sort((a, b) => a.year - b.year);

  // EV type counts (BEV and PHEV)
  const evTypeCounts = data.reduce(
    (acc, item) => {
      const type = item["Electric Vehicle Type"];
      if (type === "Battery Electric Vehicle (BEV)") {
        acc.bev++;
      } else if (type === "Plug-in Hybrid Electric Vehicle (PHEV)") {
        acc.phev++;
      }
      return acc;
    },
    { bev: 0, phev: 0 }
  );

  // Top 10 counties by EV count
  const counties = data.reduce((acc, item) => {
    const county = item.County;
    if (county) {
      acc[county] = (acc[county] || 0) + 1;
    }
    return acc;
  }, {});
  const topCounties = Object.entries(counties)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([county, count]) => ({ county, count }));

  // Caching and returning all metrics
<<<<<<< HEAD
  summaryMetricsCache = {
    totalEVs,
    avgRangeByYear,
    evTypeCounts,
    topCounties,
    highestCountyName,
    highestCountyRange,
  };
=======
  summaryMetricsCache = { totalEVs, avgRangeByYear, evTypeCounts, topCounties,highestCountyName,highestCountyRange };
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325
  return summaryMetricsCache;
};

// EV Popularity Metrics Calculation
export const calculateEVPopularityMetrics = async () => {
  if (evPopularityMetricsCache) return evPopularityMetricsCache;
  const data = await loadCSVData();

  const countyDistribution = {};
  let highestCounty = "";
  let highestCount = 0;
  data.forEach((item) => {
    if (item.County) {
      countyDistribution[item.County] =
        (countyDistribution[item.County] || 0) + 1;
<<<<<<< HEAD
      // Check if this county has the highest count
      if (countyDistribution[item.County] > highestCount) {
        highestCount = countyDistribution[item.County];
        highestCounty = item.County;
      }
=======
        // Check if this county has the highest count
    if (countyDistribution[item.County] > highestCount) {
      highestCount = countyDistribution[item.County];
      highestCounty = item.County;
    }
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325
    }
  });

  evPopularityMetricsCache = {
    countyDistribution,
    totalCountries: Object.keys(countyDistribution).length,
    highestCounty,
<<<<<<< HEAD
    highestCount,
=======
    highestCount
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325
  };
  return evPopularityMetricsCache;
};

// Calculate Vehicle Performance Metrics
export const calculateVehiclePerformanceMetrics = async () => {
  if (vehiclePerformanceMetricsCache) return vehiclePerformanceMetricsCache;
  const data = await loadCSVData();

  // Filter and parse the electric range data, removing any non-numeric values
  const ranges = data
    .map((item) => parseInt(item["Electric Range"], 10))
    .filter((range) => !isNaN(range) && range > 0)
    .sort((a, b) => a - b); // Sorting to help with descriptive stats

  // Descriptive Statistics for Electric Range
  const meanRange =
    ranges.reduce((sum, range) => sum + range, 0) / ranges.length;
  const medianRange =
    ranges.length % 2 === 0
      ? (ranges[ranges.length / 2 - 1] + ranges[ranges.length / 2]) / 2
      : ranges[Math.floor(ranges.length / 2)];

<<<<<<< HEAD
=======

>>>>>>> f55393b1a576887d779626db28b3f71990a4e325
  // Range Distribution based on 50-mile intervals
  const rangeDistribution = ranges.reduce((acc, range) => {
    const rangeCategory = `${Math.floor(range / 50) * 50}-${
      Math.floor(range / 50) * 50 + 49
    }`;
    acc[rangeCategory] = acc[rangeCategory] || { count: 0, values: [] };
    acc[rangeCategory].count += 1;
    acc[rangeCategory].values.push(range);
    return acc;
  }, {});

  // Compute min, q1, median, q3, and max for each range category
  const rangeStats = Object.entries(rangeDistribution).map(
    ([range, { values }]) => {
      values.sort((a, b) => a - b); // Sorting values for each range category

      const min = values[0];
      const max = values[values.length - 1];
      const q1 = values[Math.floor(values.length * 0.25)];
      const median =
        values.length % 2 === 0
          ? (values[values.length / 2 - 1] + values[values.length / 2]) / 2
          : values[Math.floor(values.length / 2)];
      const q3 = values[Math.floor(values.length * 0.75)];

      return { range, min, q1, median, q3, max };
    }
  );

  // Top Models by Range (find models with highest range)
  const models = data.reduce((acc, item) => {
    const range = parseInt(item["Electric Range"], 10);
    if (!isNaN(range) && item.Model) {
      acc[item.Model] = acc[item.Model] || { model: item.Model, range: 0 };
      acc[item.Model].range = Math.max(acc[item.Model].range, range);
    }
    return acc;
  }, {});
  const topModelsRange = Object.values(models)
    .sort((a, b) => b.range - a.range)
    .slice(0, 5);

  // EV Count by Price Category (price brackets)
  const priceBrackets = [
    { min: 30000, max: 35000 },
    { min: 35001, max: 40000 },
    { min: 40001, max: 45000 },
    { min: 45001, max: 50000 },
    { min: 50001, max: 55000 },
    { min: 55001, max: 60000 },
    { min: 60001, max: 65000 },
    { min: 65001, max: 70000 },
    { min: 70001, max: Infinity },
  ];
  const evPriceDistribution = priceBrackets.reduce((acc, bracket) => {
    const count = data.filter((item) => {
      const price = parseInt(item["Base MSRP"], 10);
      return !isNaN(price) && price >= bracket.min && price <= bracket.max;
    }).length;
    acc[`${bracket.min}-${bracket.max === Infinity ? "100k+" : bracket.max}`] =
      count;
    return acc;
  }, {});
<<<<<<< HEAD

  console.log(rangeStats);

=======
  

  console.log(rangeStats);
  
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325
  vehiclePerformanceMetricsCache = {
    rangeDistribution: rangeStats,
    topModelsRange,
    evPriceDistribution,
    descriptiveStats: {
<<<<<<< HEAD
      meanRange: Math.round(meanRange),
      medianRange: Math.round(medianRange),
=======
      meanRange:Math.round(meanRange),
      medianRange:Math.round(medianRange),
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325
    },
  };

  return vehiclePerformanceMetricsCache;
};

// Calculate Market Trends Metrics
export const calculateMarketTrendsMetrics = async () => {
  if (marketTrendsMetricsCache) return marketTrendsMetricsCache;
  const data = await loadCSVData();

  // Yearly Registrations using Model Year
  const yearlyRegistrations = data.reduce((acc, item) => {
    const year = parseInt(item["Model Year"], 10);
    if (!isNaN(year)) {
      acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {});

  const sortedYearlyRegistrations = Object.entries(yearlyRegistrations)
    .sort(([yearA], [yearB]) => yearA - yearB)
    .map(([year, count]) => ({ year: parseInt(year), count }));

<<<<<<< HEAD
  const sortedYearlyCountRegistrations = Object.entries(yearlyRegistrations)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => b.count - a.count);
  console.log("sortedYearlyCountRegistrations", sortedYearlyCountRegistrations);
=======
    const sortedYearlyCountRegistrations = Object.entries(yearlyRegistrations)
  .map(([year, count]) => ({ year: parseInt(year), count }))
  .sort((a, b) => b.count - a.count);
  console.log("sortedYearlyCountRegistrations" ,sortedYearlyCountRegistrations);
  
    
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325

  // Compound Annual Growth Rate (CAGR) Calculation using yearly registration count
  const growthRate = [];
  for (let i = 1; i < sortedYearlyRegistrations.length; i++) {
    const { count: startValue } = sortedYearlyRegistrations[i - 1];
    const { count: endValue, year } = sortedYearlyRegistrations[i];
    const yearsDiff =
      sortedYearlyRegistrations[i].year - sortedYearlyRegistrations[i - 1].year;

    const cagr = ((endValue / startValue) ** (1 / yearsDiff) - 1) * 100;
    growthRate.push({ year, cagr });
  }

  // Calculate Average Electric Range by Model Year (Range Improvement)
  const rangeByYear = data.reduce((acc, item) => {
    const modelYear = parseInt(item["Model Year"], 10);
    const range = parseInt(item["Electric Range"], 10);

    if (!isNaN(modelYear) && !isNaN(range)) {
      if (!acc[modelYear]) {
        acc[modelYear] = { totalRange: 0, count: 0 };
      }
      acc[modelYear].totalRange += range;
      acc[modelYear].count += 1;
    }
    return acc;
  }, {});

  const rangeImprovement = Object.entries(rangeByYear)
    .sort(([yearA], [yearB]) => yearA - yearB)
    .map(([year, { totalRange, count }]) => ({
      year: parseInt(year),
      averageRange: totalRange / count,
    }));

  // Cache and return the result
  marketTrendsMetricsCache = {
    yearlyRegistrations: sortedYearlyRegistrations,
    growthRate,
    rangeImprovement,
<<<<<<< HEAD
    highestRegistration: sortedYearlyCountRegistrations[0].count,
    highestRegistrationYear: sortedYearlyCountRegistrations[0].year,
=======
    highestRegistration:sortedYearlyCountRegistrations[0].count,
    highestRegistrationYear:sortedYearlyCountRegistrations[0].year
>>>>>>> f55393b1a576887d779626db28b3f71990a4e325
  };

  return marketTrendsMetricsCache;
};
