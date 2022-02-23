package br.com.impacta.imc.calculadoraimc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.impacta.imc.calculadoraimc.response.CalculateResponse;

/**
 * CalculadoraController
 */
@RestController
public class CalculatorController {

  @GetMapping("/imc/calculate")
  @CrossOrigin("*")
  public ResponseEntity<?> calculate(
    @RequestParam(name = "height") double heightParam,
    @RequestParam(name = "weight") double weightParam) {
    double height = heightParam / 100;
    double imc = weightParam / (height * height);
    String description = "Obesidade";

    if (imc < 18.5) {
      description = "Magreza";
    } else if (imc < 24.9) {
      description = "Normal";
    } else if (imc < 30) {
      description = "Sobrepeso";
    }

    return ResponseEntity.ok(new CalculateResponse(imc, description));
  }
}