import { useState } from 'react';

// US States for the dropdown
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
  'Wisconsin', 'Wyoming'
];

// Rating Scale Component
const RatingScale = ({ value, onChange, disabled }) => {
  const buttons = [];
  
  for (let i = 1; i <= 5; i++) {
    buttons.push(
      <button
        key={i}
        type="button"
        disabled={disabled}
        className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${value >= i ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-400'}`
        }
        onClick={() => onChange(i)}
      >
        {i}
      </button>
    );
  }
  
  return (
    <div className="flex gap-1 mt-1">
      {buttons}
    </div>
  );
};

const BlueprintBuilder = () => {
  // State for form data
  const [scenarioName, setScenarioName] = useState('');
  const [careCompany, setCareCompany] = useState('');
  const [careProvider, setCareProvider] = useState('');
  const [client, setClient] = useState('');
  const [state, setState] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [blueprint, setBlueprint] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  
  // Sample saved scenario
  const initialScenario = {
    id: '1',
    scenarioName: 'Elderly Post-Surgery Recovery',
    careCompany: 'Homecare Professional',
    careProvider: 'PT',
    client: 'John Smith',
    state: 'Illinois',
    serviceDescription: 'Physical therapy for knee replacement recovery'
  };
  
  // Saved scenarios state
  const [scenarios, setScenarios] = useState([initialScenario]);
  const [selectedScenarioId, setSelectedScenarioId] = useState('');
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!scenarioName.trim()) {
      newErrors.scenarioName = 'Scenario name is required';
    }
    
    if (!careCompany) {
      newErrors.careCompany = 'Care company is required';
    }
    
    if (!careProvider) {
      newErrors.careProvider = 'Care provider is required';
    }
    
    if (!client.trim()) {
      newErrors.client = 'Client name is required';
    }
    
    if (!state) {
      newErrors.state = 'State is required';
    }
    
    if (!serviceDescription.trim()) {
      newErrors.serviceDescription = 'Service description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle scenario selection
  const handleSelectScenario = (e) => {
    const id = e.target.value;
    setSelectedScenarioId(id);
    
    if (id) {
      const scenario = scenarios.find(s => s.id === id);
      
      if (scenario) {
        setScenarioName(scenario.scenarioName);
        setCareCompany(scenario.careCompany);
        setCareProvider(scenario.careProvider);
        setClient(scenario.client);
        setState(scenario.state);
        setServiceDescription(scenario.serviceDescription);
        
        setIsEditing(false);
        generateBlueprint(scenario);
      }
    } else {
      // Reset for new scenario
      setScenarioName('');
      setCareCompany('');
      setCareProvider('');
      setClient('');
      setState('');
      setServiceDescription('');
      setBlueprint(null);
      setIsEditing(true);
    }
  };
  
  // Generate blueprint based on scenario data
  const generateBlueprint = (data) => {
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      const blueprintData = {
        scenarioTitle: data.scenarioName,
        scenarioDetails: { ...data },
        entities: {
          client: {
            goals: ['Regain mobility', 'Return to independent living'],
            painPoints: ['Difficulty with transportation', 'Limited range of motion'],
            painPointSeverity: 4,
            expectations: 'Fast recovery with minimal discomfort',
            experienceLevel: 3
          },
          careProvider: {
            goals: ['Provide effective therapy', 'Maintain safety standards'],
            painPoints: ['High caseload', 'Transportation challenges'],
            painPointSeverity: 3,
            expectations: 'Client adherence to prescribed exercises',
            experienceLevel: 4
          },
          careCompany: {
            goals: ['Quality service delivery', 'Staff retention'],
            painPoints: ['Employee turnover', 'Scheduling conflicts'],
            painPointSeverity: 4,
            expectations: 'Consistent service delivery and billing',
            experienceLevel: 3
          }
        },
        timeline: {
          needTrigger: 'Physician referral post-surgery',
          serviceInitiation: 'Initial assessment and care plan development',
          day1: 'First treatment session with baseline measurements',
          day8: 'Progress evaluation and treatment adjustment',
          day30: 'Discharge planning and final assessment'
        },
        communications: ['Email', 'Phone', 'Client portal'],
        techUsed: ['EHR system', 'Scheduling software', 'Mobile documentation app'],
        regulations: ['Medicare guidelines', `${data.state} PT licensing requirements`, 'HIPAA compliance'],
        insurance: ['Medicare Part B', 'Secondary insurance verification'],
        sdoh: ['Transportation access', 'Home environment safety', 'Social support network'],
        opportunities: [
          'Implement telehealth options for rural clients',
          'Develop mobile app for exercise tracking',
          'Integrate transportation services for clients with mobility issues',
          'Increase caregiver compensation to reduce turnover'
        ]
      };
      
      setBlueprint(blueprintData);
      setIsLoading(false);
    }, 1500);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    const formData = {
      scenarioName,
      careCompany,
      careProvider,
      client,
      state,
      serviceDescription
    };
    
    generateBlueprint(formData);
    
    // If creating a new scenario, add it to the list
    if (!selectedScenarioId) {
      const newScenario = {
        ...formData,
        id: Date.now().toString()
      };
      
      setScenarios([...scenarios, newScenario]);
      setSelectedScenarioId(newScenario.id);
    }
    
    setIsEditing(false);
  };
  
  // Update rating in the blueprint
  const updateRating = (entity, field, value) => {
    if (!blueprint || !isEditing) return;
    
    const updatedEntities = { ...blueprint.entities };
    updatedEntities[entity] = {
      ...updatedEntities[entity],
      [field]: value
    };
    
    setBlueprint({
      ...blueprint,
      entities: updatedEntities
    });
  };
  
  // Handle new scenario
  const handleNewScenario = () => {
    setScenarioName('');
    setCareCompany('');
    setCareProvider('');
    setClient('');
    setState('');
    setServiceDescription('');
    setSelectedScenarioId('');
    setBlueprint(null);
    setIsEditing(true);
    setErrors({});
  };
  
  // Handle save changes
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    
    const formData = {
      scenarioName,
      careCompany,
      careProvider,
      client,
      state,
      serviceDescription
    };
    
    if (selectedScenarioId) {
      // Update existing scenario
      setScenarios(scenarios.map(s => 
        s.id === selectedScenarioId ? { ...formData, id: selectedScenarioId } : s
      ));
    } else {
      // Create new scenario
      const newScenario = {
        ...formData,
        id: Date.now().toString()
      };
      setScenarios([...scenarios, newScenario]);
      setSelectedScenarioId(newScenario.id);
    }
    
    setIsEditing(false);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Generating Blueprint...</p>
          </div>
        </div>
      )}
      
      <h1 className="text-3xl font-bold text-purple-800 mb-2">Healthcare Service Blueprint Generator</h1>
      <p className="text-gray-600 mb-6">Create customized healthcare service scenarios with detailed stakeholder journeys</p>
      
      {/* Scenario selection */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[300px]">
            <label htmlFor="scenarioSelect" className="block text-sm font-medium text-gray-700 mb-1">
              Saved Scenarios
            </label>
            <select
              id="scenarioSelect"
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedScenarioId}
              onChange={handleSelectScenario}
              disabled={isEditing}
            >
              <option value="">-- Create New Scenario --</option>
              {scenarios.map(scenario => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.scenarioName}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="button"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={handleNewScenario}
            disabled={isEditing}
          >
            Create New
          </button>
          
          {selectedScenarioId && !isEditing && (
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      
      {/* Scenario form */}
      <div className="mb-8">
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Scenario Builder</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario Name */}
            <div className="md:col-span-2">
              <label htmlFor="scenarioName" className="block text-sm font-medium text-gray-700 mb-1">
                Scenario Name *
              </label>
              <input
                type="text"
                id="scenarioName"
                value={scenarioName}
                onChange={(e) => {
                  setScenarioName(e.target.value);
                  if (errors.scenarioName) {
                    setErrors({...errors, scenarioName: null});
                  }
                }}
                className={`w-full p-2 border ${errors.scenarioName ? 'border-red-500' : 'border-gray-300'} rounded`}
                disabled={!isEditing}
              />
              {errors.scenarioName && (
                <p className="text-red-500 text-sm mt-1">{errors.scenarioName}</p>
              )}
            </div>
            
            {/* Care Company */}
            <div>
              <label htmlFor="careCompany" className="block text-sm font-medium text-gray-700 mb-1">
                Care Company *
              </label>
              <select
                id="careCompany"
                value={careCompany}
                onChange={(e) => {
                  setCareCompany(e.target.value);
                  if (errors.careCompany) {
                    setErrors({...errors, careCompany: null});
                  }
                }}
                className={`w-full p-2 border ${errors.careCompany ? 'border-red-500' : 'border-gray-300'} rounded`}
                disabled={!isEditing}
              >
                <option value="">-- Select --</option>
                <option value="Homecare Custodial">Homecare Custodial</option>
                <option value="Homecare Professional">Homecare Professional</option>
              </select>
              {errors.careCompany && (
                <p className="text-red-500 text-sm mt-1">{errors.careCompany}</p>
              )}
            </div>
            
            {/* Care Provider */}
            <div>
              <label htmlFor="careProvider" className="block text-sm font-medium text-gray-700 mb-1">
                Care Provider *
              </label>
              <select
                id="careProvider"
                value={careProvider}
                onChange={(e) => {
                  setCareProvider(e.target.value);
                  if (errors.careProvider) {
                    setErrors({...errors, careProvider: null});
                  }
                }}
                className={`w-full p-2 border ${errors.careProvider ? 'border-red-500' : 'border-gray-300'} rounded`}
                disabled={!isEditing}
              >
                <option value="">-- Select --</option>
                <option value="Custodial">Custodial</option>
                <option value="OT">OT</option>
                <option value="PT">PT</option>
              </select>
              {errors.careProvider && (
                <p className="text-red-500 text-sm mt-1">{errors.careProvider}</p>
              )}
            </div>
            
            {/* Client */}
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                Client *
              </label>
              <input
                type="text"
                id="client"
                value={client}
                onChange={(e) => {
                  setClient(e.target.value);
                  if (errors.client) {
                    setErrors({...errors, client: null});
                  }
                }}
                className={`w-full p-2 border ${errors.client ? 'border-red-500' : 'border-gray-300'} rounded`}
                disabled={!isEditing}
              />
              {errors.client && (
                <p className="text-red-500 text-sm mt-1">{errors.client}</p>
              )}
            </div>
            
            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <select
                id="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  if (errors.state) {
                    setErrors({...errors, state: null});
                  }
                }}
                className={`w-full p-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded`}
                disabled={!isEditing}
              >
                <option value="">-- Select --</option>
                {US_STATES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
            
            {/* Service Description */}
            <div className="md:col-span-2">
              <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Service Description *
              </label>
              <textarea
                id="serviceDescription"
                value={serviceDescription}
                onChange={(e) => {
                  setServiceDescription(e.target.value);
                  if (errors.serviceDescription) {
                    setErrors({...errors, serviceDescription: null});
                  }
                }}
                rows="3"
                className={`w-full p-2 border ${errors.serviceDescription ? 'border-red-500' : 'border-gray-300'} rounded`}
                disabled={!isEditing}
              />
              {errors.serviceDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.serviceDescription}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-4">
            {isEditing ? (
              selectedScenarioId ? (
                <>
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => {
                      setIsEditing(false);
                      // Reset form to original scenario data
                      const scenario = scenarios.find(s => s.id === selectedScenarioId);
                      if (scenario) {
                        setScenarioName(scenario.scenarioName);
                        setCareCompany(scenario.careCompany);
                        setCareProvider(scenario.careProvider);
                        setClient(scenario.client);
                        setState(scenario.state);
                        setServiceDescription(scenario.serviceDescription);
                      }
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                  onClick={handleSubmit}
                >
                  Generate Blueprint
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Blueprint Display */}
      {blueprint && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-purple-800">{blueprint.scenarioTitle}</h2>
              <p className="text-gray-600 mt-1">
                {blueprint.scenarioDetails.careCompany} | {blueprint.scenarioDetails.careProvider} | {blueprint.scenarioDetails.state}
              </p>
            </div>
            
            {isEditing ? (
              <div className="flex gap-4 mt-2 md:mt-0">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => {
                    setIsEditing(false);
                    // Reset form to original scenario data
                    const scenario = scenarios.find(s => s.id === selectedScenarioId);
                    if (scenario) {
                      setScenarioName(scenario.scenarioName);
                      setCareCompany(scenario.careCompany);
                      setCareProvider(scenario.careProvider);
                      setClient(scenario.client);
                      setState(scenario.state);
                      setServiceDescription(scenario.serviceDescription);
                    }
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => {
                    const formData = {
                      scenarioName,
                      careCompany,
                      careProvider,
                      client,
                      state,
                      serviceDescription
                    };
                    generateBlueprint(formData);
                  }}
                >
                  Resubmit to LLM
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-purple-800 mb-4">Current State Service Blueprint</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-purple-100">
                  <th className="border border-gray-300 p-3 text-left font-semibold text-purple-800 w-48">Entities</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-purple-800">Need Trigger</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-purple-800">Service Initiation</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-purple-800">Day 1</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-purple-800">Day 8</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold text-purple-800">Day 30</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">Scenario Narrative</td>
                  <td className="border border-gray-300 p-3">{blueprint.timeline.needTrigger}</td>
                  <td className="border border-gray-300 p-3">{blueprint.timeline.serviceInitiation}</td>
                  <td className="border border-gray-300 p-3">{blueprint.timeline.day1}</td>
                  <td className="border border-gray-300 p-3">{blueprint.timeline.day8}</td>
                  <td className="border border-gray-300 p-3">{blueprint.timeline.day30}</td>
                </tr>
                
                {/* Client Row */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">
                    Client
                    <div className="mt-2 text-sm font-normal">
                      <div className="mb-1">
                        <strong>Goals:</strong> {blueprint.entities.client.goals.join(', ')}
                      </div>
                      <div className="mb-1">
                        <strong>Pain Points:</strong> {blueprint.entities.client.painPoints.join(', ')}
                      </div>
                      <div className="mb-1">
                        <strong>Pain Point Severity:</strong>
                        <RatingScale
                          value={blueprint.entities.client.painPointSeverity}
                          onChange={(value) => updateRating('client', 'painPointSeverity', value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="mb-1">
                        <strong>Expectations:</strong> {blueprint.entities.client.expectations}
                      </div>
                      <div>
                        <strong>Experience Level:</strong>
                        <RatingScale
                          value={blueprint.entities.client.experienceLevel}
                          onChange={(value) => updateRating('client', 'experienceLevel', value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3" colSpan="5">
                    <p>{blueprint.scenarioDetails.client} requires {blueprint.scenarioDetails.serviceDescription} from {blueprint.scenarioDetails.careCompany} in {blueprint.scenarioDetails.state}.</p>
                  </td>
                </tr>
                
                {/* Care Provider Row */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">
                    Care Provider
                    <div className="mt-2 text-sm font-normal">
                      <div className="mb-1">
                        <strong>Goals:</strong> {blueprint.entities.careProvider.goals.join(', ')}
                      </div>
                      <div className="mb-1">
                        <strong>Pain Points:</strong> {blueprint.entities.careProvider.painPoints.join(', ')}
                      </div>
                      <div className="mb-1">
                        <strong>Pain Point Severity:</strong>
                        <RatingScale
                          value={blueprint.entities.careProvider.painPointSeverity}
                          onChange={(value) => updateRating('careProvider', 'painPointSeverity', value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="mb-1">
                        <strong>Expectations:</strong> {blueprint.entities.careProvider.expectations}
                      </div>
                      <div>
                        <strong>Experience Level:</strong>
                        <RatingScale
                          value={blueprint.entities.careProvider.experienceLevel}
                          onChange={(value) => updateRating('careProvider', 'experienceLevel', value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3" colSpan="5">
                    <p>{blueprint.scenarioDetails.careProvider} provider assigned to deliver care services.</p>
                  </td>
                </tr>
                
                {/* Care Company Row */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">
                    Care Company
                    <div className="mt-2 text-sm font-normal">
                      <div className="mb-1">
                        <strong>Goals:</strong> {blueprint.entities.careCompany.goals.join(', ')}
                      </div>
                      <div className="mb-1">
                        <strong>Pain Points:</strong> {blueprint.entities.careCompany.painPoints.join(', ')}
                      </div>
                      <div className="mb-1">
                        <strong>Pain Point Severity:</strong>
                        <RatingScale
                          value={blueprint.entities.careCompany.painPointSeverity}
                          onChange={(value) => updateRating('careCompany', 'painPointSeverity', value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="mb-1">
                        <strong>Expectations:</strong> {blueprint.entities.careCompany.expectations}
                      </div>
                      <div>
                        <strong>Experience Level:</strong>
                        <RatingScale
                          value={blueprint.entities.careCompany.experienceLevel}
                          onChange={(value) => updateRating('careCompany', 'experienceLevel', value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-3" colSpan="5">
                    <p>{blueprint.scenarioDetails.careCompany} coordinates and manages the care delivery process.</p>
                  </td>
                </tr>
                
                {/* Communications Row */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">Communications</td>
                  <td className="border border-gray-300 p-3" colSpan="5">
                    {blueprint.communications.join(', ')}
                  </td>
                </tr>
                
                {/* Tech Used Row */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">Tech Used</td>
                  <td className="border border-gray-300 p-3" colSpan="5">
                    {blueprint.techUsed.join(', ')}
                  </td>
                </tr>
                
                {/* Applicable Regulations Row */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">Applicable Regulations</td>
                  <td className="border border-gray-300 p-3" colSpan="5">
                    {blueprint.regulations.join(', ')}
                  </td>
                </tr>
                
                {/* Insurance Row */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">Insurance</td>
                  <td className="border border-gray-300 p-3" colSpan="5">
                    {blueprint.insurance.join(', ')}
                  </td>
                </tr>
                
                {/* Applicable SDOH Row */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">Applicable SDOH</td>
                  <td className="border border-gray-300 p-3" colSpan="5">
                    {blueprint.sdoh.join(', ')}
                  </td>
                </tr>
                
                {/* Opportunities Row */}
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold bg-gray-50">Opportunities</td>
                  <td className="border border-gray-300 p-3" colSpan="5">
                    <ul className="list-disc pl-5">
                      {blueprint.opportunities.map((opportunity, index) => (
                        <li key={index}>{opportunity}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioBuilder;
