import React from "react";
import Layout from "../../../components/Layout/Layout";
import { useParams } from "react-router-dom";
function ProformaDetail() {
  const { id } = useParams();
  return (
    <Layout>
      <div className="flex">
        <h1>{id}</h1>
      </div>
    </Layout>
  );
}

export default ProformaDetail;
