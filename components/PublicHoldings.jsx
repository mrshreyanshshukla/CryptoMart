export default function PublicCompaniesHoldings({
  bitcoinHoldings,
  ethereumHoldings,
}) {
  const companies = [...bitcoinHoldings, ...ethereumHoldings].reduce(
    (acc, company) => {
      const existingCompany = acc.find((c) => c.name === company.name);
      if (existingCompany) {
        existingCompany.bitcoin =
          company.total_holdings || existingCompany.bitcoin;
        existingCompany.ethereum =
          company.total_holdings || existingCompany.ethereum;
      } else {
        acc.push({
          name: company.name,
          bitcoin: company.symbol === "BTC" ? company.total_holdings : 0,
          ethereum: company.symbol === "ETH" ? company.total_holdings : 0,
        });
      }
      return acc;
    },
    []
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl text-center font-bold mb-4">
        Public Companies Bitcoin and Ethereum Holdings
      </h2>
      <div className="w-full flex justify-center">
        <div className="overflow-x-auto w-3/4">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Company</th>
                <th className="py-2 px-4 text-right">Bitcoin</th>
                <th className="py-2 px-4 text-right">Ethereum</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr
                  key={index}
                  className="bg-black p-2 hover:coin_hover_shadow transition-all hover:bg-slate-900"
                >
                  <td className="py-2 px-4">{company.name}</td>
                  <td className="py-2 px-4 text-right">
                    {company.bitcoin.toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-right">
                    {company.ethereum.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
