import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import InventoryModule from './components/InventoryModule'
import ChurnModule from './components/ChurnModule'
import LeadModal from './components/LeadModal'
import SuccessScreen from './components/SuccessScreen'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [activeModule, setActiveModule] = useState(null)
  const [calculatedLoss, setCalculatedLoss] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [leadData, setLeadData] = useState(null)

  const openModal = (loss, module) => {
    setCalculatedLoss(loss)
    setActiveModule(module)
    setShowModal(true)
  }

  const handleLeadSuccess = (data) => {
    setLeadData(data)
    setShowModal(false)
    setScreen('success')
  }

  const reset = () => {
    setScreen('home')
    setShowModal(false)
    setLeadData(null)
    setCalculatedLoss(0)
  }

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA]">
      {screen === 'home' && (
        <HomeScreen onSelect={(module) => setScreen(module)} />
      )}
      {screen === 'inventory' && (
        <InventoryModule
          onBack={() => setScreen('home')}
          onCTA={(loss) => openModal(loss, 'inventory')}
        />
      )}
      {screen === 'churn' && (
        <ChurnModule
          onBack={() => setScreen('home')}
          onCTA={(loss) => openModal(loss, 'churn')}
        />
      )}
      {screen === 'success' && (
        <SuccessScreen
          leadData={leadData}
          calculatedLoss={calculatedLoss}
          activeModule={activeModule}
          onReset={reset}
        />
      )}

      {showModal && (
        <LeadModal
          calculatedLoss={calculatedLoss}
          activeModule={activeModule}
          onClose={() => setShowModal(false)}
          onSuccess={handleLeadSuccess}
        />
      )}
    </div>
  )
}
