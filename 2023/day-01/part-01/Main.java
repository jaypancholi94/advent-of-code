import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        String fileName = "sample.txt";
        int sum = 0;

        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Extract all numbers from the line
                String numbers = line.replaceAll("[^0-9]", "");
                // Check if we have at least two numbers
                if (numbers.length() > 0) {
                    char firstNumber = numbers.charAt(0);
                    char lastNumber = numbers.charAt(numbers.length() - 1);

                    // Form the two-digit value and convert it to an integer
                    int twoDigitValue = Integer.parseInt("" + firstNumber + lastNumber);
                    // Add the two-digit value to the sum
                    sum += twoDigitValue;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("Total sum: " + sum);
    }
}