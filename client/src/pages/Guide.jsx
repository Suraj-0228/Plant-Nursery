import React, { useState } from 'react';
import { Sun, Droplet, Leaf, Bug, Sparkles, Calendar, HeartHandshake, Eye } from 'lucide-react';

const Guide = () => {
  const [symptom, setSymptom] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);

  const diagnoses = {
    'Yellowing Leaves': {
      title: 'Yellowing Leaves',
      cause: 'Commonly caused by overwatering, poor drainage, or nitrogen deficiency in the soil.',
      solution: 'Reduce watering frequency. Allow the top two inches of soil to dry out completely before watering again. Ensure the pot has drainage holes. Feed with a nitrogen-rich liquid fertilizer once a month.',
      tip: 'If only lower leaves are yellowing, it may just be natural aging. If new growth is yellowing, it is likely a watering or nutrient issue.'
    },
    'Pests (e.g., spider mites, aphids)': {
      title: 'Pest Infestation',
      cause: 'Dry air, poor ventilation, or contamination from outdoor plants often attract spider mites, aphids, or mealybugs.',
      solution: 'Isolate the plant immediately. Spray leaves with a mixture of organic neem oil and water, or wipe them gently with a mild soapy solution. Increase local humidity to deter mites.',
      tip: 'Check the undersides of leaves and leaf joints weekly, as pests love to hide in these secluded spots.'
    },
    'Drooping Leaves': {
      title: 'Drooping / Wilting Leaves',
      cause: 'Typically indicates severe underwatering, root shock, or sudden temperature drops.',
      solution: 'Check the soil. If bone dry, give the plant a thorough soak (bottom watering is excellent here). If the soil is wet, the roots may be rotting from overwatering—in this case, repot with fresh soil.',
      tip: 'Avoid placing tropical plants near air conditioners, heaters, or drafty windows.'
    },
    'Brown Spots': {
      title: 'Brown Spots on Foliage',
      cause: 'Often caused by direct sun scorch (burn marks), low humidity, or fungal leaf spot disease.',
      solution: 'Move the specimen out of direct sunlight to a spot with bright, filtered light. Use a pebble tray or humidifier to raise air humidity. Prune heavily affected leaves to prevent fungal spreading.',
      tip: 'Always water the soil directly rather than spraying water on the foliage, as wet leaves encourage fungal growth.'
    }
  };

  const handleDiagnose = () => {
    if (symptom && diagnoses[symptom]) {
      setDiagnosis(diagnoses[symptom]);
    } else {
      setDiagnosis(null);
    }
  };

  const guides = [
    {
      title: 'Watering Guide',
      icon: Droplet,
      color: 'text-blue-500 bg-blue-500/10',
      desc: 'Understand soil moisture levels. The "soak and dry" method works best for most plants: water thoroughly, then wait for topsoil to dry before watering again.'
    },
    {
      title: 'Light Requirements',
      icon: Sun,
      color: 'text-amber-500 bg-amber-500/10',
      desc: 'Positioning is key. Bright indirect light (near a sheer curtain) is the sweet spot for tropicals, while succulents love direct light, and ferns tolerate low light.'
    },
    {
      title: 'Potting & Soil Mix',
      icon: Leaf,
      color: 'text-emerald-500 bg-emerald-500/10',
      desc: 'Heavy garden soil compacts roots. Use a well-draining mix containing cocopeat, vermicompost, and perlite to let roots breathe and prevent stagnant water.'
    }
  ];

  const calendarEvents = [
    { season: 'Spring', title: 'Repotting & Nutrition', desc: 'As plants wake from dormancy, prune leggy branches, repot root-bound specimens, and begin feeding with organic fertilizer.', color: 'bg-emerald-500 text-white' },
    { season: 'Summer', title: 'Moisture & Protection', desc: 'Water more frequently as evaporation rates rise. Mist tropical species, and move plants away from harsh, scorching afternoon windows.', color: 'bg-amber-500 text-white' },
    { season: 'Autumn', title: 'Acclimatization', desc: 'Bring any outdoor balcony plants indoors before temperatures drop. Gradually reduce fertilizer and watering frequency.', color: 'bg-orange-500 text-white' },
    { season: 'Winter', title: 'Rest & Dormancy', desc: 'Most specimens go dormant. Water very sparingly—only when soil is almost completely dry. Wipe dust off leaves to help photosynthesis.', color: 'bg-blue-500 text-white' }
  ];

  return (
    <div className="bg-base-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <HeartHandshake className="h-4 w-4" /> Botanical Care Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-base-content font-heading leading-tight">
            Nurture Your Green Companions
          </h1>
          <p className="text-base-content/75 text-sm sm:text-base leading-relaxed">
            A comprehensive compendium of watering schedules, light adjustments, seasonal tips, and an interactive diagnostic console to help your plants thrive.
          </p>
        </header>

        {/* Core Care Guides */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Foliage Fundamentals</span>
            <h2 className="text-3xl font-bold text-base-content font-heading">Core Care Guidelines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((g) => {
              const Icon = g.icon;
              return (
                <div key={g.title} className="p-6 rounded-[24px] border border-base-300/40 glass-card space-y-4 hover:border-primary/20 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${g.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-base-content font-heading">{g.title}</h3>
                  <p className="text-base-content/75 text-sm leading-relaxed">{g.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Seasonal Gardening Calendar */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Year-Round Cycles</span>
            <h2 className="text-3xl font-bold text-base-content font-heading">Seasonal Care Calendar</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {calendarEvents.map((evt) => (
              <div key={evt.season} className="p-6 rounded-[24px] border border-base-300/40 glass-card flex flex-col justify-between gap-5 relative hover:border-primary/20 transition-all duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-sm uppercase tracking-wider">{evt.season}</span>
                    <Calendar className="h-4.5 w-4.5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-base-content font-heading">{evt.title}</h3>
                  <p className="text-base-content/75 text-sm leading-relaxed">{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Diagnosis Tool */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Interactive Diagnostics</span>
            <h2 className="text-3xl font-bold text-base-content font-heading">Problem Diagnosis Console</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Input Form Card */}
            <div className="md:col-span-5 p-6 rounded-[24px] border border-base-300/40 glass-card space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-error/10 p-2 rounded-xl text-error">
                  <Bug className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-base-content font-heading">Symptom Selector</h3>
              </div>
              <p className="text-base-content/75 text-sm leading-relaxed">
                Select a visual symptom from the list below to analyze potential causes and receive targeted treatments.
              </p>
              
              <div className="form-control w-full space-y-4">
                <select 
                  className="select select-bordered rounded-xl w-full glass-input text-sm h-11"
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                >
                  <option value="" disabled>Select a visual problem</option>
                  <option value="Yellowing Leaves">Yellowing Leaves</option>
                  <option value="Pests (e.g., spider mites, aphids)">Pests (e.g. Spider Mites, Aphids)</option>
                  <option value="Drooping Leaves">Drooping / Wilting Leaves</option>
                  <option value="Brown Spots">Brown Spots / Sun Scorch</option>
                </select>
                <button 
                  onClick={handleDiagnose} 
                  disabled={!symptom}
                  className="btn btn-primary w-full h-11 rounded-xl btn-premium text-sm font-semibold shadow-md flex items-center justify-center gap-1.5"
                >
                  <Eye className="h-4.5 w-4.5" /> Get Treatment Plan
                </button>
              </div>
            </div>

            {/* Results Console */}
            <div className="md:col-span-7 h-full">
              {diagnosis ? (
                <div className="p-6 rounded-[24px] border border-primary/20 bg-primary/5 glass-card space-y-5 animate-fade-in-up">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <h3 className="text-xl font-bold font-heading">{diagnosis.title} Remedy</h3>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div className="space-y-1">
                      <p className="font-bold text-base-content">Potential Cause:</p>
                      <p className="text-base-content/80 leading-relaxed">{diagnosis.cause}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="font-bold text-base-content">Actionable Solution:</p>
                      <p className="text-base-content/80 leading-relaxed">{diagnosis.solution}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent-content">
                      <p className="font-bold text-primary font-heading mb-1">Pro Cultivator Tip:</p>
                      <p className="text-base-content/85 leading-relaxed">{diagnosis.tip}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 rounded-[24px] border border-base-300/40 glass-card text-center flex flex-col items-center justify-center gap-4 h-full min-h-[260px]">
                  <Bug className="h-10 w-10 text-base-content/30" />
                  <p className="text-base-content/60 text-sm font-medium">Select a symptom and click "Get Treatment Plan" to load diagnosis.</p>
                </div>
              )}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Guide;
