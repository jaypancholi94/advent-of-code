
import java.io.BufferedReader;
import java.io.FileReader;

class Main {

    private static final int RED_CUBES_LIMIT = 12;
    private static final int GREEN_CUBES_LIMIT = 13;
    private static final int BLUE_CUBES_LIMIT = 14;

    private static final String RED_COLOR = "red";
    private static final String GREEN_COLOR = "green";
    private static final String BLUE_COLOR = "blue";

    public static void main(String[] args) {
        String fileName = "../sample.txt";
        int totalSum = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = br.readLine()) != null) {
                String gameId = getGameData(line, "id");
                String[] rounds = splitRounds(line);
                boolean isValidGame = isValidCubes(rounds);
                if (isValidGame) {
                    totalSum += Integer.parseInt(gameId);
                }
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

    public static boolean isValidCubes(String[] cubes) {
        int redCubes = 0;
        int greenCubes = 0;
        int blueCubes = 0;

        boolean isValid = true;
        for (String cube : cubes) {
            String[] cubeRoundData = cube.split(",");
            for (String cubeRound : cubeRoundData) {
                String cubeColor = cubeRound.trim().split(" ")[1];
                int cubeValue = Integer.parseInt(cubeRound.trim().split(" ")[0]);

                if (RED_COLOR.equals(cubeColor) && cubeValue > RED_CUBES_LIMIT) {
                    isValid = false;
                }
                if (GREEN_COLOR.equals(cubeColor) && cubeValue > GREEN_CUBES_LIMIT) {
                    isValid = false;
                }
                if (BLUE_COLOR.equals(cubeColor) && cubeValue > BLUE_CUBES_LIMIT) {
                    isValid = false;
                }
            }
        }
        return isValid;
    }
}
