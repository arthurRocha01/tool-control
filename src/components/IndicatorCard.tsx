interface IndicatorCardProps {
  icon: string
  title: string
  value: string | number
  subtitle?: string
  variant?: 'default' | 'warning' | 'success'
}

const IndicatorCard = ({
  icon,
  title,
  value,
  subtitle,
  variant = 'default',
}: IndicatorCardProps) => {
  const variantStyles = {
    default: 'bg-blue-50 text-blue-600',
    warning: 'bg-orange-50 text-orange-600',
    success: 'bg-green-50 text-green-600',
  }

  return (
    <div className='bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-600 mb-2'>{title}</p>
          <p className='text-3xl font-bold text-gray-900 mb-1'>{value}</p>
          {subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${variantStyles[variant]}`}>
          <i className={`hgi-stroke hgi-${icon} text-2xl`}></i>
        </div>
      </div>
    </div>
  )
}

export default IndicatorCard
