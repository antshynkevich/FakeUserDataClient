using Bogus;
using FakeUserDataClient.Server.Models;

namespace FakeUserDataClient.Server.Services;

public class DataGeneratorFactory : IDataGeneratorFactory
{
    public IDataGenerator ConfigureGenerator(int page, string region, int seed)
    {
        Randomizer.Seed = new Random(seed + (page - 1));

        IDataGenerator dataGenerator = new DataGenerator();
        var faker = new Faker();
        var fakePersonGenerator = new Faker<FakeUser>(region)
            .RuleFor(u => u.Id, f => f.Random.Guid())
            .RuleFor(u => u.FullName, f => f.Name.FullName())
            .RuleFor(u => u.Phone, f => f.Phone.PhoneNumber());

        var addr = faker.Address;
        var state = (addr.State() + ", ").OrNull(faker, .5f);
        var secondAddr = (", " + addr.SecondaryAddress()).OrNull(faker, .3f);
        var zip = (", " + addr.ZipCode()).OrNull(faker, .6f);
        fakePersonGenerator.RuleFor(u => u.StreetAddress, f => $"{state}{faker.Address.City()}, " +
        $"{faker.Address.StreetAddress()}{secondAddr}{zip}");

        dataGenerator.FakePersonGenerator = fakePersonGenerator;
        dataGenerator.Faker = faker;

        return dataGenerator;
    }
}
