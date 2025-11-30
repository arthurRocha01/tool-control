import { useState } from 'react'
import { mockSettings } from '../store/mockData'
import type { Settings as SettingsType } from '../types'

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>(mockSettings)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    console.log('Configurações salvas:', settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChange = <K extends keyof SettingsType>(field: K, value: SettingsType[K]) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Configurações</h1>
        <p className='text-gray-600'>Personalize o sistema de acordo com suas preferências</p>
      </div>

      <div className='max-w-4xl space-y-6'>
        {/* Alertas */}
        <div className='bg-white rounded-xl p-6 border border-gray-200'>
          <div className='flex items-center gap-3 mb-6'>
            <i className='hgi-stroke hgi-notification-01 text-xl text-gray-700'></i>
            <h3 className='text-lg font-semibold text-gray-900'>Alertas de Estoque</h3>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <div>
                <p className='font-medium text-gray-900'>Habilitar Alertas</p>
                <p className='text-sm text-gray-600'>
                  Receba notificações quando o estoque estiver baixo
                </p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input
                  type='checkbox'
                  checked={settings.alertsEnabled}
                  onChange={(e) => handleChange('alertsEnabled', e.target.checked)}
                  className='sr-only peer'
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Unidades */}
        <div className='bg-white rounded-xl p-6 border border-gray-200'>
          <div className='flex items-center gap-3 mb-6'>
            <i className='hgi-stroke hgi-ruler text-xl text-gray-700'></i>
            <h3 className='text-lg font-semibold text-gray-900'>Unidades de Medida</h3>
          </div>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Unidade Padrão</label>
              <select
                value={settings.defaultUnit}
                onChange={(e) =>
                  handleChange('defaultUnit', e.target.value as SettingsType['defaultUnit'])
                }
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='kg'>Quilogramas (kg)</option>
                <option value='g'>Gramas (g)</option>
                <option value='cm'>Centímetros (cm)</option>
                <option value='mm'>Milímetros (mm)</option>
                <option value='volts'>Volts (V)</option>
              </select>
              <p className='text-xs text-gray-500 mt-2'>Unidade padrão para novos produtos</p>
            </div>
          </div>
        </div>

        {/* Aparência */}
        <div className='bg-white rounded-xl p-6 border border-gray-200'>
          <div className='flex items-center gap-3 mb-6'>
            <i className='hgi-stroke hgi-colors text-xl text-gray-700'></i>
            <h3 className='text-lg font-semibold text-gray-900'>Aparência</h3>
          </div>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Tema</label>
              <div className='grid grid-cols-2 gap-4'>
                <button
                  onClick={() => handleChange('theme', 'light')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    settings.theme === 'light'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <i className='hgi-stroke hgi-sun text-2xl text-gray-700'></i>
                    <div className='text-left'>
                      <p className='font-medium text-gray-900'>Claro</p>
                      <p className='text-xs text-gray-600'>Tema padrão</p>
                    </div>
                    {settings.theme === 'light' && (
                      <i className='hgi-stroke hgi-checkmark-circle-01 text-blue-600 ml-auto'></i>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => handleChange('theme', 'dark')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    settings.theme === 'dark'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <i className='hgi-stroke hgi-moon text-2xl text-gray-700'></i>
                    <div className='text-left'>
                      <p className='font-medium text-gray-900'>Escuro</p>
                      <p className='text-xs text-gray-600'>Em breve</p>
                    </div>
                    {settings.theme === 'dark' && (
                      <i className='hgi-stroke hgi-checkmark-circle-01 text-blue-600 ml-auto'></i>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sistema */}
        <div className='bg-white rounded-xl p-6 border border-gray-200'>
          <div className='flex items-center gap-3 mb-6'>
            <i className='hgi-stroke hgi-information-circle text-xl text-gray-700'></i>
            <h3 className='text-lg font-semibold text-gray-900'>Informações do Sistema</h3>
          </div>

          <div className='space-y-3'>
            <div className='flex justify-between p-3 bg-gray-50 rounded-lg'>
              <span className='text-gray-700'>Versão</span>
              <span className='font-medium text-gray-900'>1.0.0</span>
            </div>
            <div className='flex justify-between p-3 bg-gray-50 rounded-lg'>
              <span className='text-gray-700'>Última Atualização</span>
              <span className='font-medium text-gray-900'>30/11/2025</span>
            </div>
          </div>
        </div>

        {/* Exportar Dados */}
        <div className='bg-white rounded-xl p-6 border border-gray-200'>
          <div className='flex items-center gap-3 mb-4'>
            <i className='hgi-stroke hgi-folder-export text-xl text-gray-700'></i>
            <h3 className='text-lg font-semibold text-gray-900'>Exportar Dados</h3>
          </div>

          <p className='text-gray-600 mb-4'>Baixe todos os dados do sistema em formato JSON</p>

          <button
            onClick={() => alert('Funcionalidade de exportação (simulação)')}
            className='flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
          >
            <i className='hgi-stroke hgi-download-01'></i>
            <span>Exportar Dados</span>
          </button>
        </div>

        {/* Botão Salvar */}
        <div className='flex gap-4'>
          <button
            onClick={handleSave}
            className='flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
          >
            <i className='hgi-stroke hgi-checkmark-circle-01'></i>
            {saved ? 'Configurações Salvas!' : 'Salvar Configurações'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
