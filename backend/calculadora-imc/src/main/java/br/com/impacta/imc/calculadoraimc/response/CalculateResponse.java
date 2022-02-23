package br.com.impacta.imc.calculadoraimc.response;

public class CalculateResponse {
  
  private String imc;
  private String description;

  public CalculateResponse(double imc, String description) {
    this.imc = String.format("%.2f", imc);
    this.description = description;
  }

  public String getImc() {
    return imc;
  }

  public void setImc(String imc) {
    this.imc = imc;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
