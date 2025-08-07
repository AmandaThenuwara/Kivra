import React from 'react';

const SizeChart = () => {
  const sizeData = {
    'US': {
      'XS': { chest: '32-34', waist: '26-28', hips: '34-36' },
      'S': { chest: '34-36', waist: '28-30', hips: '36-38' },
      'M': { chest: '36-38', waist: '30-32', hips: '38-40' },
      'L': { chest: '38-40', waist: '32-34', hips: '40-42' },
      'XL': { chest: '40-42', waist: '34-36', hips: '42-44' },
      'XXL': { chest: '42-44', waist: '36-38', hips: '44-46' }
    },
    'EU': {
      'XS': { chest: '40-42', waist: '34-36', hips: '42-44' },
      'S': { chest: '42-44', waist: '36-38', hips: '44-46' },
      'M': { chest: '44-46', waist: '38-40', hips: '46-48' },
      'L': { chest: '46-48', waist: '40-42', hips: '48-50' },
      'XL': { chest: '48-50', waist: '42-44', hips: '50-52' },
      'XXL': { chest: '50-52', waist: '44-46', hips: '52-54' }
    }
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const measurements = ['chest', 'waist', 'hips'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-charcoal mb-2">How to Measure</h3>
        <p className="text-charcoal text-sm">
          Use a flexible measuring tape to measure around the fullest part of each area
        </p>
        </div>
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* US Sizes */}
        <div>
          <h4 className="text-lg font-semibold text-charcoal mb-4 text-center">US Sizes</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gold-light">
                  <th className="border border-shadow px-4 py-3 text-left text-charcoal font-semibold">Size</th>
                  {measurements.map(measurement => (
                    <th key={measurement} className="border border-shadow px-4 py-3 text-center text-charcoal font-semibold capitalize">
                      {measurement}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizes.map(size => (
                  <tr key={size} className="hover:bg-gold-light/30 transition-colors duration-200">
                    <td className="border border-shadow px-4 py-3 text-charcoal font-medium">{size}</td>
                    {measurements.map(measurement => (
                      <td key={measurement} className="border border-shadow px-4 py-3 text-center text-charcoal">
                        {sizeData['US'][size][measurement]}"
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
          
        {/* EU Sizes */}
        <div>
          <h4 className="text-lg font-semibold text-charcoal mb-4 text-center">EU Sizes</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gold-light">
                  <th className="border border-shadow px-4 py-3 text-left text-charcoal font-semibold">Size</th>
                  {measurements.map(measurement => (
                    <th key={measurement} className="border border-shadow px-4 py-3 text-center text-charcoal font-semibold capitalize">
                      {measurement}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizes.map(size => (
                  <tr key={size} className="hover:bg-gold-light/30 transition-colors duration-200">
                    <td className="border border-shadow px-4 py-3 text-charcoal font-medium">{size}</td>
                    {measurements.map(measurement => (
                      <td key={measurement} className="border border-shadow px-4 py-3 text-center text-charcoal">
                        {sizeData['EU'][size][measurement]} cm
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
        
      {/* Measurement Guide */}
      <div className="bg-gold-light/20 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-charcoal mb-4">Measurement Guide</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-black font-bold">C</span>
            </div>
            <h5 className="font-semibold text-charcoal mb-2">Chest</h5>
            <p className="text-sm text-charcoal">
              Measure around the fullest part of your chest, keeping the tape horizontal
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-black font-bold">W</span>
            </div>
            <h5 className="font-semibold text-charcoal mb-2">Waist</h5>
            <p className="text-sm text-charcoal">
              Measure around your natural waistline, keeping the tape comfortably loose
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-black font-bold">H</span>
            </div>
            <h5 className="font-semibold text-charcoal mb-2">Hips</h5>
            <p className="text-sm text-charcoal">
              Measure around the fullest part of your hips, keeping the tape horizontal
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-burgundy-light/10 p-6 rounded-xl border border-burgundy-light">
        <h4 className="text-lg font-semibold text-charcoal mb-4">Size Tips</h4>
        <ul className="space-y-2 text-sm text-charcoal">
          <li className="flex items-start">
            <span className="text-primary-gold mr-2">•</span>
            If you're between sizes, we recommend sizing up for a more comfortable fit
          </li>
          <li className="flex items-start">
            <span className="text-primary-gold mr-2">•</span>
            For the most accurate measurements, have someone else measure you
          </li>
          <li className="flex items-start">
            <span className="text-primary-gold mr-2">•</span>
            Don't pull the measuring tape too tight - it should be snug but comfortable
          </li>
          <li className="flex items-start">
            <span className="text-primary-gold mr-2">•</span>
            Our size charts are based on body measurements, not garment measurements
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SizeChart;
