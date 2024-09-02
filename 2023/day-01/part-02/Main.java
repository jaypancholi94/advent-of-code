
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {

    // Static map for number conversion
    private static final Map<String, String> NUMBERS_MAP = new HashMap<>();

    static {
        NUMBERS_MAP.put("one", "1");
        NUMBERS_MAP.put("two", "2");
        NUMBERS_MAP.put("three", "3");
        NUMBERS_MAP.put("four", "4");
        NUMBERS_MAP.put("five", "5");
        NUMBERS_MAP.put("six", "6");
        NUMBERS_MAP.put("seven", "7");
        NUMBERS_MAP.put("eight", "8");
        NUMBERS_MAP.put("nine", "9");
        NUMBERS_MAP.put("1", "1");
        NUMBERS_MAP.put("2", "2");
        NUMBERS_MAP.put("3", "3");
        NUMBERS_MAP.put("4", "4");
        NUMBERS_MAP.put("5", "5");
        NUMBERS_MAP.put("6", "6");
        NUMBERS_MAP.put("7", "7");
        NUMBERS_MAP.put("8", "8");
        NUMBERS_MAP.put("9", "9");
    }

    public static void main(String[] args) {
        String fileName = "../sample.txt";
        int totalSum = 0;

        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
                int first_index = line.length();
                int last_index = -1;
                String firstDigit = "";
                String lastDigit = "";

                for (String number : NUMBERS_MAP.keySet()) {
                    int index = line.indexOf(number);
                    if (index != -1 && index < first_index) {
                        firstDigit = NUMBERS_MAP.get(number);
                        first_index = index;
                    }
                    int lastIndex = line.lastIndexOf(number);
                    if (lastIndex != -1 && lastIndex > last_index) {
                        lastDigit = NUMBERS_MAP.get(number);
                        last_index = lastIndex;
                    }
                }

                System.out.println(line + " : " + firstDigit + lastDigit);
                totalSum += Integer.parseInt(firstDigit + lastDigit);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("Total sum: " + totalSum);  // Output should be 281
    }

}
