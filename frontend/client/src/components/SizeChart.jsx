import React from 'react';
import './SizeChart.css';

const SizeChart = ({ isOpen, onClose, category, gender }) => {
  if (!isOpen) return null;

  const getSizeChart = () => {
    const charts = {
      // Men's size charts
      men: {
        Shirts: {
          title: "Men's Shirt Size Chart",
          headers: ["Size", "Chest (inches)", "Chest (cm)", "Length (inches)", "Length (cm)"],
          rows: [
            ["XS", "34-36", "86-91", "28", "71"],
            ["S", "36-38", "91-97", "29", "74"],
            ["M", "38-40", "97-102", "30", "76"],
            ["L", "40-42", "102-107", "31", "79"],
            ["XL", "42-44", "107-112", "32", "81"],
            ["XXL", "44-46", "112-117", "33", "84"]
          ]
        },
        Suits: {
          title: "Men's Suit Size Chart",
          headers: ["Size", "Chest (inches)", "Chest (cm)", "Waist (inches)", "Waist (cm)"],
          rows: [
            ["36", "36", "91", "30", "76"],
            ["38", "38", "97", "32", "81"],
            ["40", "40", "102", "34", "86"],
            ["42", "42", "107", "36", "91"],
            ["44", "44", "112", "38", "97"],
            ["46", "46", "117", "40", "102"]
          ]
        },
        Shoes: {
          title: "Men's Shoe Size Chart",
          headers: ["US Size", "UK Size", "EU Size", "Length (inches)", "Length (cm)"],
          rows: [
            ["7", "6", "40", "9.6", "24.4"],
            ["8", "7", "41", "10.0", "25.4"],
            ["9", "8", "42", "10.4", "26.4"],
            ["10", "9", "43", "10.8", "27.4"],
            ["11", "10", "44", "11.2", "28.4"],
            ["12", "11", "45", "11.6", "29.4"]
          ]
        },
        Knitwear: {
          title: "Men's Knitwear Size Chart",
          headers: ["Size", "Chest (inches)", "Chest (cm)", "Sleeve (inches)", "Sleeve (cm)"],
          rows: [
            ["S", "36-38", "91-97", "32", "81"],
            ["M", "38-40", "97-102", "33", "84"],
            ["L", "40-42", "102-107", "34", "86"],
            ["XL", "42-44", "107-112", "35", "89"]
          ]
        },
        Blazers: {
          title: "Men's Blazer Size Chart",
          headers: ["Size", "Chest (inches)", "Chest (cm)", "Shoulder (inches)", "Shoulder (cm)"],
          rows: [
            ["38", "38", "97", "17", "43"],
            ["40", "40", "102", "17.5", "44"],
            ["42", "42", "107", "18", "46"],
            ["44", "44", "112", "18.5", "47"]
          ]
        },
        Denim: {
          title: "Men's Denim Size Chart",
          headers: ["Waist Size", "Waist (inches)", "Waist (cm)", "Hip (inches)", "Hip (cm)"],
          rows: [
            ["30", "30", "76", "38", "97"],
            ["32", "32", "81", "40", "102"],
            ["34", "34", "86", "42", "107"],
            ["36", "36", "91", "44", "112"],
            ["38", "38", "97", "46", "117"]
          ]
        }
      },
      // Women's size charts
      women: {
        Dresses: {
          title: "Women's Dress Size Chart",
          headers: ["Size", "Bust (inches)", "Bust (cm)", "Waist (inches)", "Waist (cm)", "Hip (inches)", "Hip (cm)"],
          rows: [
            ["XS", "32", "81", "24", "61", "34", "86"],
            ["S", "34", "86", "26", "66", "36", "91"],
            ["M", "36", "91", "28", "71", "38", "97"],
            ["L", "38", "97", "30", "76", "40", "102"],
            ["XL", "40", "102", "32", "81", "42", "107"]
          ]
        },
        Blouses: {
          title: "Women's Blouse Size Chart",
          headers: ["Size", "Bust (inches)", "Bust (cm)", "Waist (inches)", "Waist (cm)"],
          rows: [
            ["XS", "32", "81", "24", "61"],
            ["S", "34", "86", "26", "66"],
            ["M", "36", "91", "28", "71"],
            ["L", "38", "97", "30", "76"]
          ]
        },
        Shoes: {
          title: "Women's Shoe Size Chart",
          headers: ["US Size", "UK Size", "EU Size", "Length (inches)", "Length (cm)"],
          rows: [
            ["5", "3", "35", "8.5", "21.6"],
            ["6", "4", "36", "9.0", "22.9"],
            ["7", "5", "37", "9.5", "24.1"],
            ["8", "6", "38", "10.0", "25.4"],
            ["9", "7", "39", "10.5", "26.7"],
            ["10", "8", "40", "11.0", "27.9"]
          ]
        },
        Outerwear: {
          title: "Women's Outerwear Size Chart",
          headers: ["Size", "Bust (inches)", "Bust (cm)", "Waist (inches)", "Waist (cm)", "Length (inches)", "Length (cm)"],
          rows: [
            ["XS", "32", "81", "24", "61", "26", "66"],
            ["S", "34", "86", "26", "66", "27", "69"],
            ["M", "36", "91", "28", "71", "28", "71"],
            ["L", "38", "97", "30", "76", "29", "74"],
            ["XL", "40", "102", "32", "81", "30", "76"]
          ]
        }
      },
      // General accessories
      general: {
        Accessories: {
          title: "Accessories Size Guide",
          headers: ["Item", "Size", "Measurements"],
          rows: [
            ["Watch", "One Size", "Adjustable 6-8 inches"],
            ["Tie", "One Size", "58 inches length"],
            ["Scarf", "One Size", "70 x 20 inches"],
            ["Sunglasses", "One Size", "Universal fit"],
            ["Belt", "S/M/L/XL", "32-42 inches adjustable"]
          ]
        },
        Jewelry: {
          title: "Jewelry Size Guide",
          headers: ["Item", "Size", "Measurements"],
          rows: [
            ["Necklace", "Standard", "16-18 inches"],
            ["Bracelet", "One Size", "7-8 inches adjustable"],
            ["Ring", "US 5-10", "Various sizes available"],
            ["Earrings", "One Size", "Universal fit"]
          ]
        },
        Bags: {
          title: "Bag Size Guide",
          headers: ["Size", "Width (inches)", "Height (inches)", "Depth (inches)"],
          rows: [
            ["Small", "8-10", "6-8", "3-4"],
            ["Medium", "12-14", "9-11", "5-6"],
            ["Large", "16-18", "12-14", "7-8"]
          ]
        },
        Fragrance: {
          title: "Fragrance Size Guide",
          headers: ["Size", "Volume", "Usage"],
          rows: [
            ["Travel", "15ml", "2-3 weeks daily use"],
            ["Standard", "50ml", "2-3 months daily use"],
            ["Large", "100ml", "4-6 months daily use"]
          ]
        }
      }
    };

    // Determine which chart to show
    if (gender === 'men' && charts.men[category]) {
      return charts.men[category];
    } else if (gender === 'women' && charts.women[category]) {
      return charts.women[category];
    } else if (charts.general[category]) {
      return charts.general[category];
    } else {
      // Default general sizing guide
      return {
        title: "General Size Guide",
        headers: ["Size", "Description", "Best For"],
        rows: [
          ["XS", "Extra Small", "Petite builds"],
          ["S", "Small", "Slim builds"],
          ["M", "Medium", "Average builds"],
          ["L", "Large", "Fuller builds"],
          ["XL", "Extra Large", "Plus size builds"]
        ]
      };
    }
  };

  const chart = getSizeChart();

  return (
    <div className="size-chart-overlay" onClick={onClose}>
      <div className="size-chart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="size-chart-header">
          <h3>{chart.title}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="size-chart-content">
          <div className="size-chart-table-container">
            <table className="size-chart-table">
              <thead>
                <tr>
                  {chart.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="size-chart-tips">
            <h4>Measuring Tips:</h4>
            <ul>
              <li>Measure your body, not over clothing</li>
              <li>Keep the measuring tape snug but not tight</li>
              <li>For chest/bust: Measure around the fullest part</li>
              <li>For waist: Measure around the narrowest part</li>
              <li>For hips: Measure around the fullest part</li>
              <li>When in doubt, size up for comfort</li>
            </ul>
          </div>
        </div>
        
        <div className="size-chart-footer">
          <p>Still unsure? Contact our customer service for personalized assistance.</p>
          <button className="contact-btn">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
