namespace FakeUserDataClient.Server.Models;

public static class Constants
{
    public const int TotalProbabilityPercent = 100;         // 100 means 1 error
    public const int StepErrorProbabilityInPercent = 25;    // 25 percent is 1/4 of 1 (1/4 of 100% probability of error)
    public const int ErrorDiscretes = 4;                    // 100 / 25 = 4 (means 4 error probabilities in 1 entire error)
}
