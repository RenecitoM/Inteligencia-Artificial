import React, { useState, useEffect } from 'react';
import './Body.css';

interface DataObject {
  [key: string]: any;
}

export const Body: React.FC = () => {
  const [data, setData] = useState<DataObject[]>([]);
  const [selectedData, setSelectedData] = useState<DataObject | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [responseData, setResponseData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadEndpointData(currentPage);
  }, [currentPage]);

  const loadEndpointData = async (page: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/data?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      if (jsonData && Array.isArray(jsonData.data)) {
        setData(jsonData.data);
        setTotalPages(jsonData.totalPages);
      } else {
        throw new Error('Received data is not in expected format');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleRowClick = (rowData: DataObject) => {
    const dataToSend = { ...rowData };
    delete dataToSend['_id'];
    setSelectedData(dataToSend);
    sendSelectedData(dataToSend);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const sendSelectedData = async (data: DataObject) => {
    try {
      const response = await fetch('http://localhost:3000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
      const result = await response.json();
      setResponseData(result);
      setIsModalOpen(true); // Open the modal when data is received
      console.log('Data sent successfully', result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResponseData(null);
  };

  return (
    <>
      <section id="home" className="center">
        <p className="logo">Attack Calculator</p>
        <h1>Hello, our software helps you predict if a network interaction has been malicious</h1>
      </section>
      <section id="about" className="center">
        <h1>Select any transaction</h1>
        <div className="data-container">
          <table>
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row)}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-5'>
          <h1>Page: {currentPage}</h1>
          <h1>Total Pages: {totalPages}</h1>
        </div>
        <div className='pagination'>
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </section>

      {responseData && (
        <div
          className={`modal fade ${isModalOpen ? 'show' : ''}`}
          style={{ display: isModalOpen ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: '#007bff', color: '#fff' }}>
                <h5 className="modal-title">Prediction Result</h5>
                <button type="button" className="close" aria-label="Close" onClick={closeModal} style={{ color: '#fff' }}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <pre
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '10px',
                    borderRadius: '5px',
                    overflowX: 'auto',
                  }}
                >
                  <span className='fs-5'>Malicious attack probability: {responseData.predictionResult}</span>
                </pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
