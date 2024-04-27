namespace FakeUserDataClient.Server.Services;

public interface IDataGeneratorFactory
{
    IDataGenerator ConfigureGenerator(int page, string region, int seed);
}
