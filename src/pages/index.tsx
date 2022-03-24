import Layout from 'src/components/shared/Layout'
import Table from 'src/components/Vaults/TableVaults'

export default function Home() {
  return (
    <Layout>
      <div className="p-4 mb-4 bg-white rounded-lg">
        <Table />
      </div>
    </Layout>
  )
}
