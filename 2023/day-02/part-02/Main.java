
import java.io.BufferedReader;
import java.io.FileReader;

class Main {

    private static final String RED_COLOR = "red";
    private static final String GREEN_COLOR = "green";
    private static final String BLUE_COLOR = "blue";

    public static void main(String[] args) {
        String fileName = "../sample.txt";
        int totalSum = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {

                String[] rounds = splitRounds(line);
                int cubesMultipliedValue = getPowerMultiplicationOfCube(rounds);

                totalSum += cubesMultipliedValue;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("Total sum: " + totalSum);
    }

    public static String getGameData(String line, String type) {
        String gameTitle = line.split(":")[0];
        if (type.equals("id")) {
            return gameTitle.split(" ")[1];
        }
        return line.split(":")[1];
    }

    public static String[] splitRounds(String line) {
        String[] rounds = getGameData(line, "cubes").split(";");
        return rounds;
    }

    public static int getPowerMultiplicationOfCube(String[] cubes) {
        int redCount = 0;
        int greenCount = 0;
        int blueCount = 0;

        for (String cube : cubes) {
            String[] cubeRoundData = cube.split(",");
            for (String cubeRound : cubeRoundData) {
                String cubeColor = cubeRound.trim().split(" ")[1];
                int cubeValue = Integer.parseInt(cubeRound.trim().split(" ")[0]);

                if (RED_COLOR.equals(cubeColor) && cubeValue > redCount) {
                    redCount = cubeValue;
                }
                if (GREEN_COLOR.equals(cubeColor) && cubeValue > greenCount) {
                    greenCount = cubeValue;
                }
                if (BLUE_COLOR.equals(cubeColor) && cubeValue > blueCount) {
                    blueCount = cubeValue;
                }
            }
        }
        return (redCount * greenCount * blueCount);
    }
}
